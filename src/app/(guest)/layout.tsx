import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#DFF2EB" }}>
        <div className="min-h-screen bg-[#DFF2EB]">
          <Navbar />
          <main className="">{children}</main>
          <Footer /> {/* Pindahkan Footer ke dalam div */}
        </div>
      </body>
    </html>
  );
}