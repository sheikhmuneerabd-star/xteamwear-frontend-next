import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboard() {
  await connectDB();

  // 1. Fetch Stock Statistics
  const products = await Product.find({}, "variants").lean();
  let totalProducts = products.length;
  let inStockProducts = 0;
  let outOfStockProducts = 0;

  products.forEach((prod: any) => {
    const hasVariants = prod.variants && prod.variants.length > 0;
    if (!hasVariants) {
      inStockProducts++;
      return;
    }
    const totalStock = prod.variants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0);
    if (totalStock > 0) {
      inStockProducts++;
    } else {
      outOfStockProducts++;
    }
  });

  // 2. Fetch User Count
  const userCount = await User.countDocuments();

  // 3. Fetch All Orders for Calculations
  const rawOrders = await Order.find().sort({ createdAt: -1 }).lean();

  // Convert MongoDB ObjectIds & Dates to Plain Strings
  const serializedOrders = JSON.parse(JSON.stringify(rawOrders));

  // 4. Calculate Time-Based Order & Revenue Metrics
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  let todayRevenue = 0;
  let todayOrdersCount = 0;
  let last12hOrdersCount = 0;
  let last24hOrdersCount = 0;
  let totalRevenue = 0;

  serializedOrders.forEach((o: any) => {
    const orderDate = new Date(o.createdAt);
    const orderTotal = o.total || 0;

    totalRevenue += orderTotal;

    if (orderDate >= startOfToday) {
      todayRevenue += orderTotal;
      todayOrdersCount++;
    }

    if (orderDate >= twelveHoursAgo) {
      last12hOrdersCount++;
    }

    if (orderDate >= twentyFourHoursAgo) {
      last24hOrdersCount++;
    }
  });

  const stats = {
    totalProducts,
    inStockProducts,
    outOfStockProducts,
    totalUsers: userCount,
    todayRevenue,
    todayOrdersCount,
    last12hOrdersCount,
    last24hOrdersCount,
    totalRevenue,
    totalOrdersCount: serializedOrders.length,
  };

  return <DashboardClient stats={stats} rawOrders={serializedOrders} />;
}