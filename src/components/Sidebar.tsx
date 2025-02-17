import Link from "next/link";
import {
  FaHome,
  FaList,
  FaTools,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#050315] p-4 shadow-lg flex flex-col border-t-4 border-[#4A628A]">
      {/* Header */}
      <h1 className="text-xl font-bold mb-6 text-[#DFF2EB] text-center">
        ADMIN
      </h1>
      <hr className="border-t-2 border-[#4A628A] mb-4" />

      {/* Menu List */}
      <ul className="menu space-y-3 flex-1">
        <li>
          <Link
            href="/Admin/Home"
            className="flex items-center py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
        </li>
        <hr className="border-t-2 border-[#4A628A] mb-4" />
        <li>
          <Link
            href="/Admin/Kategori"
            className="flex items-center py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            <FaList className="mr-2" />
            Kategori
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/ListAlat"
            className="flex items-center py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            <FaTools className="mr-2" />
            Daftar Alat
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/SewaAlat"
            className="flex items-center py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            <FaShoppingCart className="mr-2" />
            Penyewaan
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/Pelanggan"
            className="flex items-center py-4 px-4 rounded-lg text-[#DFF2EB] hover:bg-[#B9E5E8] hover:text-[#050315] transition"
          >
            <FaUsers className="mr-2" />
            Pelanggan
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
