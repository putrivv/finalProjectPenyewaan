import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-gradient-to-r from-green-100 to-blue-100 border-b border-green-100 px-20">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-800">BEAR RENTAL</h1>
      </div>
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-800">
          <li>
            <Link href="/" className="btn btn-ghost mr-4">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="btn btn-ghost mr-4">
              About
            </Link>
          </li>
          <li>
            <Link href="/login" className="btn btn-ghost mr-4 bg-green-200">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="btn btn-ghost mr-4 bg-blue-200">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
