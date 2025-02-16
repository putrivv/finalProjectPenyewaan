import Navbar from "@/components/Navbar";
import "../globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <div className="min-h-screen bg-[#DFF2EB]">
        <Navbar />
        <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
