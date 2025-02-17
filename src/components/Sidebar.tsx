import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#050315] p-4 shadow-lg flex flex-col border-t-4 border-[#4A628A]">
      {/* Header */}
      <h1 className="text-xl font-bold mb-6 text-[#DFF2EB] text-center">
        Admin
      </h1>
      <hr className="border-t-2 border-[#4A628A] mb-4" />

      {/* Menu List */}
      <ul className="menu space-y-3 flex-1">
        <li>
          <Link
            href="/Admin/EditDeleteBarang"
            className="block py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            Edit/Delete Barang
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/SewaAlat"
            className="block py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            Penyewaan
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/ListAlat"
            className="block py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            Daftar Barang
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/ListAlat"
            className="block py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            Pelanggan
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;