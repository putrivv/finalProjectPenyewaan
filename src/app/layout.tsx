import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper /> {/* Gunakan Wrapper yang sudah pakai `usePathname` */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
