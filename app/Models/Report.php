<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'reporter_id',
        'reported_id',
        'type', // ['user', 'vendor', 'content']
        'description',
        'status', // ['pending', 'investigating', 'resolved']
        'resolution'
    ];

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function reportedUser()
    {
        return $this->belongsTo(User::class, 'reported_id');
    }
}