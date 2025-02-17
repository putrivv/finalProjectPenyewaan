import Navbar from "@/components/Navbar";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <QueryProvider>
        <main className="p-4">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
