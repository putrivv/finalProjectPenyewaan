export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Layout khusus untuk login */}
      {children}
    </div>
  );
}
