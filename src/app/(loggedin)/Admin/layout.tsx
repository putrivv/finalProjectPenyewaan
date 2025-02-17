import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
      <main className=" ">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
