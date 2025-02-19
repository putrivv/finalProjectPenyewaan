// penyewaan.type.ts

export interface Penyewaan {
    penyewaan_id: number;
    penyewaan_pelanggan_id: number;
    penyewaan_tglsewa: string; // Format tanggal: "YYYY-MM-DD"
    penyewaan_tglkembali: string; // Format tanggal: "YYYY-MM-DD"
    penyewaan_sttspembayaran: string; // Contoh: "Lunas" atau "Belum Lunas"
    penyewaan_sttskembali: string; // Contoh: "Sudah Kembali" atau "Belum Kembali"
    penyewaan_totalharga: number;
  }