<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Rating;
use Illuminate\Auth\Access\Response;

class RatingPolicy
{
    public function update(User $user, Rating $rating)
    {
        return $user->id === $rating->user_id
            ? Response::allow()
            : Response::deny('Anda tidak memiliki akses untuk mengubah komentar ini');
    }

    public function delete(User $user, Rating $rating)
    {
        return $user->id === $rating->user_id || $user->isAdmin()
            ? Response::allow()
            : Response::deny('Anda tidak memiliki akses untuk menghapus komentar ini');
    }
}
