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
    <div className="h-screen w-64 shadow bg-[white] p-4 flex flex-col border-t-4 border-[#d1fae5]">
      {/* Header */}
      <h1 className="text-xl font-bold mb-6 text-[#050315] text-center">
        BEAR RENTAL
      </h1>
      <hr className="border-t-2 border-[#d1fae5] mb-4" />
      {/* Menu List */}
      <ul className="menu space-y-3 flex-1">
        <li>
          <Link
            href="/Admin/Beranda"
            className="flex items-center py-4 px-4 rounded-lg text-[#050315] hover:bg-green-100 hover:text-[#050315] transition duration-300 ease-in-out"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
        </li>
        <hr className="border-t-2 border-[#d1fae5] mb-4" />
        <li>
          <Link
            href="/Admin/Kategori"
            className="flex items-center py-4 px-4 rounded-lg text-[#050315] hover:bg-green-100 hover:text-[#050315] transition duration-300 ease-in-out"
          >
            <FaList className="mr-2" />
            Kategori
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/ListAlat"
            className="flex items-center py-4 px-4 rounded-lg text-[#050315] hover:bg-green-100 hover:text-[#050315] transition duration-300 ease-in-out"
          >
            <FaTools className="mr-2" />
            Daftar Alat
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/SewaAlat"
            className="flex items-center py-4 px-4 rounded-lg text-[#050315] hover:bg-green-100 hover:text-[#050315] transition duration-300 ease-in-out"
          >
            <FaShoppingCart className="mr-2" />
            Penyewaan
          </Link>
        </li>
        <li>
          <Link
            href="/Admin/Pelanggan"
            className="flex items-center py-4 px-4 rounded-lg text-[#050315] hover:bg-green-100 hover:text-[#050315] transition duration-300 ease-in-out"
          >
            <FaUsers className="mr-2" />
            Daftar Pelanggan
          </Link>
        </li>

        
      </ul>
    </div>
  );
};

export default Sidebar;