
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <QueryProvider>
        <main className="bg-white">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
