import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import axios from 'axios';

export default function Payment() {
    const { transaction } = usePage().props;
    const [selectedMethod, setSelectedMethod] = useState(null);

    // Fungsi format mata uang
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(value);
    };

    // Hitung detail pembayaran
    const subtotal = transaction.product?.harga * transaction.quantity;
    const commission = transaction.commission_amount;
    const total = subtotal;

    const handlePayment = async () => {
        try {
            const response = await axios.post(
                route('transactions.process', transaction.id)
            );

            if (response.data.success) {
                window.location.href = response.data.invoice_url;
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Gagal memproses pembayaran. Silakan coba lagi.');
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-6">Proses Pembayaran</h1>

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Detail Pesanan</h2>
                        <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                                <span>Produk:</span>
                                <span className="font-medium">{transaction.product?.nama}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Vendor:</span>
                                <span className="text-gray-600">{transaction.vendor?.nama}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 border-t pt-4">
                        <h2 className="text-lg font-semibold mb-3">Rincian Harga</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Harga Satuan</span>
                                <span>{formatCurrency(transaction.product?.harga)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Jumlah</span>
                                <span>{transaction.quantity}x</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>Komisi Platform (10%)</span>
                                <span>{formatCurrency(commission)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                                <span className="font-semibold">Total Pembayaran</span>
                                <span className="font-bold text-red-600">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-4">Metode Pembayaran</h2>
                        <div className="space-y-3">
                            {[
                                { id: 'bank_transfer', label: 'Transfer Bank', banks: ['BCA', 'Mandiri', 'BRI'] },
                                { id: 'e_wallet', label: 'E-Wallet', wallets: ['Gopay', 'OVO', 'Dana'] },
                                { id: 'credit_card', label: 'Kartu Kredit' }
                            ].map(method => (
                                <div
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                                        selectedMethod === method.id
                                            ? 'border-red-500 bg-red-50'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="font-medium">{method.label}</div>
                                    {method.banks && (
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            {method.banks.map(bank => (
                                                <span
                                                    key={bank}
                                                    className="px-2 py-1 bg-white border rounded text-sm"
                                                >
                                                    {bank}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {method.wallets && (
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            {method.wallets.map(wallet => (
                                                <span
                                                    key={wallet}
                                                    className="px-2 py-1 bg-white border rounded text-sm"
                                                >
                                                    {wallet}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            className={`w-full py-3 rounded-md transition-colors ${
                                selectedMethod
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!selectedMethod}
                            onClick={handlePayment}
                        >
                            Bayar Sekarang {selectedMethod && formatCurrency(total)}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
