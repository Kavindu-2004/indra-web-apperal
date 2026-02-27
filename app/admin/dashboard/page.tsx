export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-2xl p-5">
          <div className="text-sm text-gray-600">Total Products</div>
          <div className="text-2xl font-bold">—</div>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <div className="text-sm text-gray-600">Total Orders</div>
          <div className="text-2xl font-bold">—</div>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <div className="text-sm text-gray-600">Pending Orders</div>
          <div className="text-2xl font-bold">—</div>
        </div>
      </div>

      <p className="text-gray-600 text-sm">
        Next: Products + image upload + edit/delete, then Orders + status update + tracking.
      </p>
    </div>
  );
}