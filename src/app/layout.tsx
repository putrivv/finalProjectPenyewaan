import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import ErrorFallbackView from "@/components/ErrrorFallback/ErrorFallback.view";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
