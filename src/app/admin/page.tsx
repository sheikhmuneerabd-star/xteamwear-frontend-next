import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import User from "@/lib/models/User";

export default async function AdminDashboard() {
  await connectDB();
  const productCount = await Product.countDocuments();
  const userCount = await User.countDocuments();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Products</p>
          <p className="text-3xl font-bold mt-2">{productCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-3xl font-bold mt-2">{userCount}</p>
        </div>
      </div>
    </div>
  );
}