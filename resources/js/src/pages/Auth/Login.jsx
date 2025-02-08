import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '../../common/forms';
import { Button } from '../../common/buttons';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
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

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50">
                <div className="w-full sm:max-w-md p-8 bg-white rounded-2xl shadow-lg">
                    <div className="mb-8 text-center">
                        <Link href="/" className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                            Credsh
                        </Link>
                        <h2 className="mt-3 text-2xl font-bold text-gray-800">Selamat Datang Kembali</h2>
                        <p className="mt-2 text-gray-600">Silakan masuk ke akun Anda</p>
                    </div>

                    {status && (
                        <div className="mb-4 p-4 bg-green-50 rounded-lg text-green-600 text-sm font-medium">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                value={data.email}
                                error={errors.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="rounded-xl"
                            />
                        </div>

                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                label="Password"
                                value={data.password}
                                error={errors.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="rounded-xl"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded-md border-gray-300 text-pink-600 shadow-sm focus:ring-pink-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Ingat Saya</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                                >
                                    Lupa Password?
                                </Link>
                            )}
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            disabled={processing}
                            className="w-full"
                        >
                            Masuk
                        </Button>

                        <div className="text-center text-gray-600">
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
