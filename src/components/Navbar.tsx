import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-[#DFF2EB] border-b border-gray-300 px-40">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-800">
          BEAR RENTAL
        </h1>
      </div>
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-800">
        <li>
            <Link 
              href="/" 
              className="btn btn-ghost mr-4" 
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="btn btn-ghost mr-4" 
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/login" 
              className="btn btn-ghost mr-4 bg-[#c0dee3]" 
            >
              Login
            </Link>
          </li>
          <li>
            <Link 
              href="/register" 
              className="btn btn-ghost mr-4 bg-[#B9E5E8]"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}