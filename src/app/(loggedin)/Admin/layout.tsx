import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
      <main className=" ">{children}</main>
    </div>
  );
};

export default Layout;
