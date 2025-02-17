import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-[#DFF2EB] border-b border-gray-300 px-40">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold text-gray-800">
          BEAR RENTAL
        </Link>
      </div>
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-800">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/">Services</Link></li>
          <li><Link href="/">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
}
