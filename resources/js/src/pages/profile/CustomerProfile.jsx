import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/Layout';

export default function CustomerProfile({ user, auth, notifications, flash }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <MainLayout auth={auth} notifications={notifications} flash={flash}>
            <Head title="Profil Customer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Profil Customer</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Foto Profil</label>
                                    <input
                                        type="file"
                                        onChange={e => setData('avatar', e.target.files[0])}
                                        className="w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Nama</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Telepon</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Simpan Perubahan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
