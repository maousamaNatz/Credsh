import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '../../common/forms';
import { Button } from '../../common/buttons';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Masuk" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className="mb-6 text-center">
                        <Link href="/" className="text-3xl font-bold text-pink-600">
                            Credsh
                        </Link>
                        <h2 className="mt-2 text-xl font-semibold">Selamat Datang Kembali</h2>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                value={data.email}
                                error={errors.email}
                                onChange={(e) => setData('email', e.target.value)}
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
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-pink-600 shadow-sm focus:ring-pink-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Ingat Saya</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                    Lupa Password?
                                </Link>
                            )}
                        </div>

                        <div className="mt-6">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full justify-center"
                                disabled={processing}
                            >
                                Masuk
                            </Button>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <Link
                                href={route('register')}
                                className="font-semibold text-pink-600 hover:text-pink-700"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}