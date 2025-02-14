<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

trait FileManagerTrait
{
    /**
     * Membuat direktori berdasarkan tipe user
     */
    protected function createDirectory(User $user, string $type = 'general'): string
    {
        $basePath = match($user->role) {
            'admin' => "users/admins/{$user->id}",
            'vendor' => "vendors/{$user->id}",
            default => "users/{$user->id}",
        };

        $fullPath = "{$basePath}/{$type}";
        Storage::disk('public')->makeDirectory($fullPath);
        return $fullPath;
    }

    /**
     * Generate nama file unik dengan prefix role
     */
    protected function generateHashedName(User $user, $file): string
    {
        $prefix = match($user->role) {
            'admin' => 'adm_',
            'vendor' => 'vndr_',
            default => 'usr_',
        };

        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $hash = Str::slug($originalName) . '_' . Str::random(8) . '_' . time();

        return $prefix . sha1($hash) . ".{$extension}";
    }

    /**
     * Menyimpan file dengan struktur terorganisir
     */
    public function saveUserFile(User $user, $file, string $fileType = 'documents'): string
    {
        $directory = $this->createDirectory($user, $fileType);
        $filename = $this->generateHashedName($user, $file);

        $path = Storage::disk('public')->putFileAs(
            $directory,
            $file,
            $filename,
            ['visibility' => 'public']
        );

        return $path;
    }

    /**
     * Menghapus file spesifik
     */
    public function deleteFile(string $filePath): bool
    {
        if (Storage::disk('public')->exists($filePath)) {
            return Storage::disk('public')->delete($filePath);
        }
        return false;
    }

    /**
     * Membersihkan seluruh direktori user
     */
    public function cleanUserDirectory(User $user): void
    {
        $basePath = match($user->role) {
            'admin' => "users/admins/{$user->id}",
            'vendor' => "vendors/{$user->id}",
            default => "users/{$user->id}",
        };

        Storage::disk('public')->deleteDirectory($basePath);
    }

    /**
     * Update file user dengan handling overwrite
     */
    public function updateUserFile(User $user, $newFile, string $oldFilePath = null, string $fileType = 'documents'): string
    {
        if ($oldFilePath) {
            $this->deleteFile($oldFilePath);
        }
        return $this->saveUserFile($user, $newFile, $fileType);
    }
}
