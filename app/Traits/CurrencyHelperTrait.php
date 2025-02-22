<?php

namespace App\Traits;

trait CurrencyHelperTrait
{
    /**
     * Format angka menjadi format rupiah.
     * Contoh: 1000000 menjadi "Rp1.000.000"
     *
     * @param float|int $amount Nominal yang akan diformat.
     * @param bool $withSymbol Apakah menyertakan simbol mata uang.
     * @return string Hasil format mata uang.
     */
    public function formatRupiah($amount, bool $withSymbol = true): string
    {
        $formatted = number_format($amount, 0, ',', '.');
        return $withSymbol ? 'Rp' . $formatted : $formatted;
    }

    /**
     * Format angka ke dalam format mata uang dengan simbol khusus.
     *
     * @param float|int $amount Nominal yang akan diformat.
     * @param string $currency Simbol mata uang, default "Rp".
     * @param int $decimals Jumlah angka desimal, default 0.
     * @return string Hasil format mata uang.
     */
    public function formatCurrency($amount, string $currency = 'Rp', int $decimals = 0): string
    {
        $formatted = number_format($amount, $decimals, ',', '.');
        return $currency . $formatted;
    }
}
