import { Head, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/dashboardLayouts';
import { useState } from 'react';

export default function AdminProfile({ user }) {
    const [previewImage, setPreviewImage] = useState(null);
    const { data, setData, errors, processing } = useForm({
        avatar: null,
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));

            // Menggunakan FormData untuk upload file
            const formData = new FormData();
            formData.append('avatar', file);

            router.post('/profile', formData, {
                preserveScroll: true,
                onSuccess: () => {
                    setPreviewImage(null);
                }
            });
        }
    };

    const handleDeleteAvatar = () => {
        router.post('/profile', {
            _method: 'delete',
            avatar: ''
        }, {
            preserveScroll: true
        });
    };

    return (
        <DashboardLayout>
            <Head title="Profil Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Profil Admin</h2>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Bagian Foto Profil */}
                                <div className="w-full md:w-1/3">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium mb-2">Foto Profil</h3>
                                        <input
                                            type="file"
                                            id="avatar"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            disabled={processing}
                                        />
                                        <label htmlFor="avatar" className="cursor-pointer">
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-48 h-48 rounded-full object-cover border-4 border-gray-200"
                                                />
                                            ) : user.avatar ? (
                                                <img
                                                    src={`/storage/${user.avatar}`}
                                                    alt="Foto Profil"
                                                    className="w-48 h-48 rounded-full object-cover border-4 border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500">Tambah Foto</span>
                                                </div>
                                            )}
                                        </label>

                                        {user.avatar && (
                                            <button
                                                onClick={handleDeleteAvatar}
                                                className="mt-2 text-red-600 hover:text-red-800 text-sm"
                                                disabled={processing}
                                            >
                                                {processing ? 'Memproses...' : 'Hapus Foto'}
                                            </button>
                                        )}

                                        {errors.avatar && (
                                            <div className="text-red-500 text-sm mt-1">{errors.avatar}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Bagian Informasi Pribadi */}
                                <div className="w-full md:w-2/3">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium mb-2">Informasi Pribadi</h3>
                                        <div className="space-y-2">
                                            <div>
                                                <label className="text-gray-600">Nama Lengkap:</label>
                                                <p className="font-medium">{user.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-gray-600">Email:</label>
                                                <p className="font-medium">{user.email}</p>
                                            </div>
                                            <div>
                                                <label className="text-gray-600">Nomor Telepon:</label>
                                                <p className="font-medium">{user.phone || '-'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bagian Informasi Role */}
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium mb-2">Hak Akses</h3>
                                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md inline-block">
                                            {user.role.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
