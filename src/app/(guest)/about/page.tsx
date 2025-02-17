import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="text-[#050315] py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section About Us dengan Background Berbeda */}
        <div className="text-center bg-[#B9E5E8] p-12 rounded-xl shadow-md">
          <h2 className="text-4xl font-bold text-[#050315]">About Us</h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Kami adalah platform persewaan yang menyediakan berbagai kebutuhan
            Anda, mulai dari properti, kendaraan, hingga perlengkapan acara
            dengan mudah dan aman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <img
            src="https://asset.kompas.com/crops/gHWWoSqmqo9P_rkWlxQsHDiymR4=/192x128:1728x1152/750x500/data/photo/2021/02/26/6039052d20b9b.jpg"
            alt="bengkel"
            className="rounded-xl shadow-md"
          />
          <img
            src="https://www.olx.co.id/news/wp-content/uploads/2024/09/alat-elektronik-rumah-tangga-696x464.webp"
            alt="dapur"
            className="rounded-xl shadow-md"
          />
          <img
            src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01hx4n04zhxchpnwsbtedebk1m.jpg"
            alt="outdoor"
            className="rounded-xl shadow-md"
          />
          <img
            src="https://s0.bukalapak.com/uploads/attachment/74434/Aksesori_Laptop.jpg"
            alt="elektronik"
            className="rounded-xl shadow-md"
          />
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center">
            Kami Pastikan Persewaan yang Mudah dan Terpercaya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <p>
              Dengan sistem yang transparan dan berbagai pilihan persewaan, kami
              memberikan kemudahan bagi Anda untuk menemukan barang atau layanan
              yang sesuai dengan kebutuhan.
            </p>
            <p>
              Proses persewaan kami didukung oleh teknologi canggih dan layanan
              pelanggan yang responsif, memastikan pengalaman pengguna yang aman
              dan nyaman.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://cdn0-production-images-kly.akamaized.net/LRbupwED3bVHkYtfcwCO_Wgp-P8=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3245217/original/027457600_1600754989-photo-1542744173-8e7e53415bb0__4_.jpg"
            alt="founder"
            className="rounded-xl shadow-md w-full md:w-1/3"
          />
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold">
              Membantu Masyarakat dengan Layanan Persewaan
            </h3>
            <p className="mt-4">
              Kami percaya bahwa setiap orang harus memiliki akses mudah
              terhadap barang atau layanan yang mereka butuhkan tanpa harus
              membelinya. Dengan semangat berbagi dan keberlanjutan, kami hadir
              untuk menjembatani kebutuhan Anda.
            </p>
            <blockquote className="mt-4 p-4 border-l-4 border-[#4A628A] bg-[#B9E5E8] italic">
              "Memberikan solusi sewa yang praktis, efisien, dan ramah
              lingkungan bagi semua orang."
            </blockquote>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold">Jelajahi Peralatan Persewaan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-[#B9E5E8] rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Kendaraan</h4>
              <p className="mt-2">
                Sewa mobil, motor, dan kendaraan lainnya dengan mudah.
              </p>
            </div>
            <div className="p-6 bg-[#B9E5E8] rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Properti</h4>
              <p className="mt-2">
                Temukan properti untuk disewa, mulai dari rumah hingga
                apartemen.
              </p>
            </div>
            <div className="p-6 bg-[#B9E5E8] rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Peralatan Acara</h4>
              <p className="mt-2">
                Sewa perlengkapan acara seperti tenda, kursi, dan sound system.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/listbarang">
              <button className="btn bg-[#7AB2D3] text-white hover:bg-[#4A628A] shadow-lg transition-all">
                Lihat Daftar Alat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
