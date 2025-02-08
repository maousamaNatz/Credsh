<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'vendor_id',
        'amount',
        'status', // ['pending', 'completed', 'failed', 'refunded']
        'payment_method',
        'commission_rate',
        'commission_amount',
        'escrow_released',
        'transaction_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
