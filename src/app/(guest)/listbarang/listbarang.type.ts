export interface ListBarang {
  alat_id: number;
  alat_kategori_id: number;
  alat_nama: string;
  alat_deskripsi: string;
  alat_hargaperhari: number;
  alat_stok: number;
}

export interface Kategori {
  kategori_id: number;
  kategori_nama: string;
}
