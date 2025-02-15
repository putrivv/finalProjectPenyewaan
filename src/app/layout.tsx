import "./globals.css"; // Path relatif dari src/app/layout.tsx
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
