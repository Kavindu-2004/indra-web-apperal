export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 py-6">{children}</div>
    </div>
  );
}