"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname === "/Guest") {
    return null; 
  }

  return <Navbar />;
}
