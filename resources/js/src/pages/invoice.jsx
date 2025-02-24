import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Invoice() {
    const { transaction } = usePage().props;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Invoice Pembayaran</h1>
                        <p className="text-gray-500 mt-2">Nomor Invoice: {transaction.id}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Vendor</h2>
                            <p className="text-gray-600">{transaction.vendor.nama}</p>
                            <p className="text-gray-600">{transaction.vendor.alamat}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-600">
                                Tanggal Transaksi: {formatDate(transaction.transaction_date)}
                            </p>
                            <p className="text-gray-600">
                                Tanggal Pembayaran: {formatDate(transaction.paid_at)}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-b py-4 mb-6">
                        <div className="grid grid-cols-4 gap-4 font-semibold">
                            <div>Produk</div>
                            <div>Harga Satuan</div>
                            <div>Jumlah</div>
                            <div className="text-right">Total</div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="grid grid-cols-4 gap-4 mb-4">
                            <div>{transaction.product.nama}</div>
                            <div>{formatCurrency(transaction.product.harga)}</div>
                            <div>{transaction.quantity}</div>
                            <div className="text-right">
                                {formatCurrency(transaction.product.harga * transaction.quantity)}
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex justify-end">
                            <div className="w-64">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>{formatCurrency(transaction.amount)}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-gray-500">
                                    <span>Komisi Platform:</span>
                                    <span>{formatCurrency(transaction.commission_amount)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span className="text-red-600">
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">Metode Pembayaran</h3>
                                <p className="capitalize">{transaction.payment_method}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Status Pembayaran</h3>
                                <span className={`px-3 py-1 rounded-full ${
                                    transaction.status === 'success'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {transaction.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => window.print()}
                            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                        >
                            Download Invoice
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
