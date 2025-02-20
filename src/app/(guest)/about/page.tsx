import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="text-[#050315] py-12">
      <div className="container mx-auto px-6 lg:px-20 max-w-screen-xl">
        {/* Section About Us */}
        <div className="text-center bg-[#B9E5E8] p-12 rounded-xl shadow-md">
          <h2 className="text-4xl font-bold text-[#050315]">About Us</h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Kami adalah platform persewaan yang menyediakan berbagai kebutuhan
            Anda, mulai dari smartphone, kamera profesional, peralatan pendakian
            gunung, hingga kendaraan off-road. Semua tersedia dengan harga
            terjangkau dan proses yang mudah.
          </p>
        </div>

        {/* Gambar yang relevan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            "https://i.pinimg.com/736x/58/91/85/58918578d9d2ef4b1390865860fcb69e.jpg",
            "https://i.pinimg.com/736x/a9/0d/fa/a90dfa2c5de27f6a7f7de81263c33395.jpg",
            "https://i.pinimg.com/736x/66/7f/1a/667f1aa0a0a002af717e0e303059384f.jpg",
            "https://i.pinimg.com/736x/0a/13/09/0a1309a95a99423f98fb21bab19ed82d.jpg",
          ].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`item-${index}`}
              className="rounded-xl shadow-md aspect-video object-cover"
            />
          ))}
        </div>

        {/* Deskripsi tentang kemudahan persewaan */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center">
            Kami Pastikan Persewaan yang Mudah dan Terpercaya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <p>
              Dengan sistem yang transparan dan berbagai pilihan persewaan, kami
              memberikan kemudahan bagi Anda untuk menemukan barang yang sesuai
              dengan kebutuhan dokumentasi, petualangan, atau pekerjaan Anda.
            </p>
            <p>
              Proses persewaan kami didukung oleh teknologi canggih dan layanan
              pelanggan yang responsif, memastikan pengalaman pengguna yang aman
              dan nyaman.
            </p>
          </div>
        </div>

        {/* Founder section */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://i.pinimg.com/736x/85/2b/2d/852b2db7e57d493bd034277dc6674ef0.jpg"
            alt="founder"
            className="rounded-xl shadow-md w-full md:w-1/3 aspect-square object-cover"
          />
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold">
              Membantu Petualangan dan Kreativitas dengan Layanan Persewaan
            </h3>
            <p className="mt-4">
              Kami percaya bahwa setiap orang harus memiliki akses mudah
              terhadap alat yang mereka butuhkan tanpa harus membelinya. Dengan
              semangat berbagi dan inovasi, kami hadir untuk mendukung
              petualangan dan kreativitas Anda.
            </p>
            <blockquote className="mt-4 p-4 border-l-4 border-[#4A628A] bg-[#B9E5E8] italic">
              "Memberikan solusi sewa yang praktis, efisien, dan terjangkau
              untuk semua orang."
            </blockquote>
          </div>
        </div>

        {/* Kategori persewaan */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold">Jelajahi Peralatan Persewaan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                title: "Smartphone",
                desc: "Sewa smartphone terbaru untuk kebutuhan komunikasi dan dokumentasi.",
              },
              {
                title: "Kamera Profesional",
                desc: "Temukan kamera DSLR, mirrorless, dan aksesoris fotografi lainnya.",
              },
              {
                title: "Peralatan Pendakian",
                desc: "Sewa tenda, sleeping bag, kompor portable, dan alat pendakian lainnya.",
              },
              {
                title: "Kendaraan Off-Road",
                desc: "Sewa mobil off-road, motor trail, dan kendaraan lainnya untuk petualangan Anda.",
              },
            ].map(({ title, desc }, index) => (
              <div
                key={index}
                className="p-6 bg-[#B9E5E8] rounded-lg shadow-md"
              >
                <h4 className="text-xl font-semibold">{title}</h4>
                <p className="mt-2">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/listbarang">
              <button className="btn bg-[#7AB2D3] text-white hover:bg-[#4A628A] shadow-lg transition-all py-3 px-6 rounded-lg">
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
