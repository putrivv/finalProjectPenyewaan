// ListAlat.type.ts

export interface Kategori {
  kategori_id: number;
  kategori_nama: string;
  created_at: string;
  updated_at: string;
}

export interface Item {
  alat_id: number;
  alat_kategori_id: number;
  alat_nama: string;
  alat_deskripsi: string;
  alat_hargaperhari: number;
  alat_stok: number;
  alat_gambar: string | null;
  created_at: string;
  updated_at: string;
  kategori: Kategori; // Relasi ke kategori
}