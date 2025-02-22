/**
 * Modul untuk memformat angka ke dalam format mata uang ala Rupiah.
 *
 * Terdapat dua fungsi:
 * - formatRupiah: Memformat angka menjadi format Rupiah dengan pemisah ribuan.
 *   Contoh: 1000000 menjadi "Rp1.000.000"
 * - formatCurrency: Memformat angka dengan simbol mata uang yang bisa disesuaikan dan jumlah desimal.
 *   Contoh: formatCurrency(1000000, '$', 2) menghasilkan "$1.000.000,00"
 */

const CurrencyHelper = {
  /**
   * Memformat angka menjadi format Rupiah.
   *
   * @param {number} amount Nominal yang akan diformat.
   * @param {boolean} withSymbol Jika true, menyertakan simbol "Rp", default true.
   * @returns {string} Hasil format mata uang.
   */
  formatRupiah(amount, withSymbol = true) {
    // Gunakan toLocaleString dengan locale Indonesia (id-ID) untuk format ribuan.
    const formatted = Number(amount).toLocaleString("id-ID", { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    });
    return withSymbol ? "Rp" + formatted : formatted;
  },

  /**
   * Memformat angka dengan simbol mata uang sesuai parameter.
   *
   * @param {number} amount Nominal yang akan diformat.
   * @param {string} currency Simbol mata uang, default "Rp".
   * @param {number} decimals Jumlah angka desimal, default 0.
   * @returns {string} Hasil format mata uang.
   */
  formatCurrency(amount, currency = "Rp", decimals = 0) {
    const formatted = Number(amount).toLocaleString("id-ID", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return currency + formatted;
  },
};

export default CurrencyHelper; 