import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Container untuk Sidebar dan Main Content */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;