import React from 'react';
import { useForm } from '@inertiajs/react';

const Payment = ({ transaction }) => {
    const { data, setData, post } = useForm({
        payment_method: '',
        amount: transaction.amount,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/payments/${transaction.id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Metode Pembayaran</label>
                    <input
                        type="text"
                        value={data.payment_method}
                        onChange={(e) => setData('payment_method', e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block">Jumlah</label>
                    <input
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Bayar
                </button>
            </form>
        </div>
    );
};

export default Payment;
