import Layout from "@/Layouts/Layout";
import { usePage } from "@inertiajs/react";

const ProductVendor = () => {
    // Mengambil data vendor beserta produknya dari props Inertia
    const { vendor } = usePage().props;

    return (
        <Layout>
            {/* Menampilkan nama toko */}
            <h1>{vendor?.name || "Toko Vendor"}</h1>

            {/* Menampilkan daftar semua produk */}
            <h2>Daftar Produk</h2>
            {vendor?.products && vendor.products.length > 0 ? (
                <ul>
                    {vendor.products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Tidak ada produk.</p>
            )}
        </Layout>
    );
};

export default ProductVendor;
