import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '../../common/forms';
import { Button } from '../../common/buttons';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Daftar" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className="mb-6 text-center">
                        <Link href="/" className="text-3xl font-bold text-pink-600">
                            Credsh
                        </Link>
                        <h2 className="mt-2 text-xl font-semibold">Buat Akun Baru</h2>
                    </div>

                    <form onSubmit={submit}>
                        <div>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                label="Nama Lengkap"
                                value={data.name}
                                error={errors.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                value={data.email}
                                error={errors.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                label="Password"
                                value={data.password}
                                error={errors.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                label="Konfirmasi Password"
                                value={data.password_confirmation}
                                error={errors.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full justify-center"
                                disabled={processing}
                            >
                                Daftar
                            </Button>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Sudah punya akun?{' '}
                            <Link
                                href={route('login')}
                                className="font-semibold text-pink-600 hover:text-pink-700"
                            >
                                Masuk
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
