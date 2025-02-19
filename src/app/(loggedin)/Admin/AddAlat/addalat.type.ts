// addalat.type.ts
export interface Alat {
    alat_kategori_id: number; // ID kategori (angka)
    alat_nama: string; // Nama alat
    alat_deskripsi: string; // Deskripsi alat
    alat_hargaperhari: number; // Harga per hari (angka)
    alat_stok: number; // Stok alat (angka)
  }