import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <div className="min-h-screen">
        <Navbar />
        <main className="">{children}</main>
        </div>
        <Footer/>
      </body>
    </html>
  );
}
