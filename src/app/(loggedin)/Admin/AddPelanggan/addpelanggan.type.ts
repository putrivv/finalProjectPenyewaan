// Interface untuk data pelanggan yang dikirim ke API
export interface PelangganInput {
    pelanggan_nama: string;
    pelanggan_alamat: string;
    pelanggan_notelp: string;
    pelanggan_email: string;
  }
  
  // Interface untuk respons sukses dari API
  export interface PelangganResponse {
    success: boolean;
    message: string;
    data: PelangganData;
  }
  
  // Interface untuk data pelanggan yang diterima dari API
  export interface PelangganData {
    pelanggan_id: number;
    pelanggan_nama: string;
    pelanggan_email: string;
    pelanggan_notelp: string;
    pelanggan_alamat: string;
    created_at: string; // Format ISO datetime (misalnya "2025-02-19T07:53:14.000000Z")
    updated_at: string; // Format ISO datetime
  }