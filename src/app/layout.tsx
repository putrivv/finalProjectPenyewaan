import Footer from "@/components/Footer";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <QueryProvider>
        <main className="p-4">{children}</main>
        </QueryProvider>
        <Footer/>
      </body>
    </html>
  );
}
