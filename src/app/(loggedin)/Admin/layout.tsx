import QueryProvider from "@/app/providers/QueryProvider";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
    </QueryProvider>
  );
};

export default Layout;