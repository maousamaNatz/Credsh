import React, { useState, useEffect } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import MainLayout from '@/Layouts/Layout'
import { toast } from 'react-hot-toast'
import LeafletMap from '@/template/leaflet2.jsx'  // Updated to use leaflet2.jsx

// Komponen Modal untuk form produk
const ProductModal = ({ isOpen, onClose, modalType, initialData, onSubmit, processing }) => {
    const { data, setData, reset, errors } = useForm({
        name: initialData?.name || '',
        price: initialData?.price || '',
        description: initialData?.description || '',
    })

    useEffect(() => {
        if (isOpen) {
            setData({
                name: initialData?.name || '',
                price: initialData?.price || '',
                description: initialData?.description || '',
            })
        }
    }, [isOpen, initialData])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(data)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                        {modalType === 'add' ? 'Tambah Produk Baru' : 'Edit Produk'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Produk
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan nama produk"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Harga
                        </label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan harga"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            placeholder="Masukkan deskripsi produk"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                            {modalType === 'add' ? 'Tambah' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Komponen utama VendorProfile
export default function VendorProfile({ auth, vendor, products = [], analytics }) {
    const [activeTab, setActiveTab] = useState('produk')
    const [searchTerm, setSearchTerm] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState('add')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [vendorData, setVendorData] = useState(vendor)

    const { post, processing } = useForm()

    // Filter produk berdasarkan pencarian
    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredProducts(filtered)
    }, [searchTerm, products])

    // Auto-adjust map: ketika alamat diubah, lakukan pencarian lokasi secara otomatis
    useEffect(() => {
        const adjustMap = async () => {
            if (vendorData.alamat && vendorData.kabupaten && vendorData.kota) {
                const fullAlamat = `${vendorData.alamat}, ${vendorData.kabupaten}, ${vendorData.kota}`;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAlamat)}`);
                    const data = await response.json();
                    if (data && data.length > 0) {
                        const { lat, lon } = data[0];
                        setVendorData('latitude', lat);
                        setVendorData('longitude', lon);
                    }
                } catch (err) {
                    console.error('Geocoding error:', err);
                }
            }
        };

        const timeout = setTimeout(adjustMap, 1000);
        return () => clearTimeout(timeout);
    }, [vendorData.alamat, vendorData.kabupaten, vendorData.kota]);

    // Handler untuk membuka modal tambah produk
    const handleAddProduct = () => {
        setModalType('add')
        setSelectedProduct(null)
        setModalOpen(true)
    }

    // Handler untuk membuka modal edit produk
    const handleEditProduct = (product) => {
        setModalType('edit')
        setSelectedProduct(product)
        setModalOpen(true)
    }

    // Handler untuk menghapus produk
    const handleDeleteProduct = (productId) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            post(route('products.destroy', productId), {
                method: 'delete',
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Produk berhasil dihapus')
                },
                onError: () => {
                    toast.error('Gagal menghapus produk')
                }
            })
        }
    }

    // Handler untuk submit form produk (tambah/edit)
    const handleSubmitProduct = (formData) => {
        if (modalType === 'add') {
            post(route('products.store'), {
                ...formData,
                onSuccess: () => {
                    setModalOpen(false)
                    toast.success('Produk berhasil ditambahkan')
                },
                onError: () => {
                    toast.error('Gagal menambahkan produk')
                }
            })
        } else {
            post(route('products.update', selectedProduct.id), {
                ...formData,
                _method: 'put',
                onSuccess: () => {
                    setModalOpen(false)
                    toast.success('Produk berhasil diperbarui')
                },
                onError: () => {
                    toast.error('Gagal memperbarui produk')
                }
            })
        }
    }

    // Handler untuk submit form vendor
    const handleSubmitVendor = async (event) => {
        event.preventDefault();

        const formData = {
            alamat: vendorData.alamat,
            deskripsi: vendorData.deskripsi,
            latitude: vendorData.latitude,
            longitude: vendorData.longitude,
            harga_mulai: vendorData.harga_mulai,
            nama: vendorData.nama || auth.user.name,
        };

        try {
            await post(route('vendor.update', vendorData.id), formData);
            toast.success('Profil vendor berhasil diperbarui');
        } catch (error) {
            toast.error('Gagal memperbarui profil vendor');
        }
    };

    return (
        <MainLayout auth={auth}>
            <Head title="Dashboard Vendor" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="p-6 bg-white shadow-lg rounded-lg mb-8">
                    <div className="flex flex-col sm:flex-row items-center">
                        <img
                            src={auth.user.avatar || '/images/default-avatar.png'}
                            alt="Avatar Vendor"
                            className="w-24 h-24 rounded-full border-4 border-green-500 mr-0 sm:mr-4 mb-4 sm:mb-0"
                        />
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-900">{auth.user.name}</h2>
                            <div className="mt-2 space-y-1">
                                <p className="text-gray-600">
                                    <span className="font-medium">Email:</span> {auth.user.email}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Telepon:</span> {auth.user.phone || 'Tidak tersedia'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Link
                                href={route('profile.edit')}
                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                            >
                                Edit Profil
                            </Link>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-700 text-lg">
                            {auth.user.description ? auth.user.description : 'Belum ada deskripsi tentang vendor ini.'}
                        </p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Lokasi Vendor</h3>
                        <LeafletMap
                            center={vendorData.location ? [vendorData.location.lat, vendorData.location.lng] : [-6.2, 106.816666]}
                            zoom={vendorData.location ? 15 : 13}
                            venue={{
                                name: vendorData.name,
                                address: vendorData.address || 'Alamat belum diatur',
                                image: vendorData.avatar || '/images/default-avatar.png'
                            }}
                        />
                    </div>
                </div>
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Produk
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {analytics.totalProducts}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Penjualan
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {analytics.totalSales}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Pendapatan
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            Rp {analytics.totalRevenue.toLocaleString()}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Add Product */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="w-full sm:w-96">
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Link
                        href={route('products.create')}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Tambah Produk
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                id: product.id,
                                nama: product.name,
                                harga: parseInt(product.price).toLocaleString(),
                                deskripsi_singkat: product.description,
                                gambar: product.image || '/images/default-product.jpg',
                                rating: product.rating || 0,
                                terjual: product.sold || 0
                            }}
                        />
                    ))}
                </div>

            </div>
        </MainLayout>
    )
}
