import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="">
        <Sidebar />
      </aside>

      {/* Konten lebih ke kiri */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
