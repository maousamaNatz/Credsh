import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '', 
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-pink-50 to-purple-50">
            <Head title="Login" />

            <div className="w-full sm:max-w-md mt-6 px-8 py-8 bg-white shadow-xl rounded-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Selamat Datang
                    </h2>
                    <p className="text-gray-600">Silakan masuk ke akun Anda</p>
                </div>

                {status && (
                    <div className="mb-4 p-4 rounded-lg bg-green-50 text-green-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150"
                                placeholder="nama@email.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150"
                                placeholder="Masukkan password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 transition duration-150"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                                Ingat saya
                            </label>
                        </div>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-pink-600 hover:text-pink-700 font-medium transition duration-150"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 font-medium transition duration-150"
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Belum punya akun? </span>
                        <Link 
                            href={route('register')} 
                            className="font-medium text-pink-600 hover:text-pink-700 transition duration-150"
                        >
                            Daftar sekarang
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
