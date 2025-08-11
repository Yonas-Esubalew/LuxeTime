import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ShoppingCart,
  BarChart2,
  Watch,
  Layers,
  AlertCircle,
  Database,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const useOverviewData = () => {
  // Placeholder enterprise-ready data shape; swap with SWR/React Query call
  const products = [
    { id: "1", title: "Audemars Piguet Royal Oak", price: 42000, stock: 3, sales: 28 },
    { id: "2", title: "Patek Philippe Nautilus", price: 69000, stock: 8, sales: 41 },
    { id: "3", title: "Rolex Submariner Date", price: 12000, stock: 2, sales: 67 },
    { id: "4", title: "Vacheron Constantin Overseas", price: 35000, stock: 6, sales: 22 },
    { id: "5", title: "Omega Speedmaster Pro", price: 6800, stock: 12, sales: 31 },
    { id: "6", title: "Cartier Santos", price: 8200, stock: 4, sales: 19 },
  ];

  const orders = [
    { id: "o1", amount: 12000 },
    { id: "o2", amount: 42000 },
    { id: "o3", amount: 6800 },
    { id: "o4", amount: 69000 },
    { id: "o5", amount: 35000 },
  ];

  const salesData = [
    { month: "Jan", sales: 18 },
    { month: "Feb", sales: 22 },
    { month: "Mar", sales: 25 },
    { month: "Apr", sales: 28 },
    { month: "May", sales: 33 },
    { month: "Jun", sales: 31 },
    { month: "Jul", sales: 36 },
    { month: "Aug", sales: 42 },
    { month: "Sep", sales: 44 },
    { month: "Oct", sales: 47 },
    { month: "Nov", sales: 51 },
    { month: "Dec", sales: 55 },
  ];

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + (o.amount || 0), 0),
    [orders]
  );
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => (p.stock || 0) < 5).length;
  const avgOrderValue = orders.length
    ? Math.round(totalRevenue / orders.length)
    : 0;

  return {
    products,
    orders,
    salesData,
    totalRevenue,
    totalProducts,
    lowStockCount,
    avgOrderValue,
  };
};

function KpiCard({ icon, title, value, delta, deltaColor, iconBg, iconColor }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-xl p-5 shadow-lg border border-gray-700"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-400 flex items-center gap-1">
            {icon}
            {title}
          </div>
          <div className="text-2xl font-bold mt-1">{value}</div>
          {delta && (
            <div className={`text-xs mt-2 flex items-center ${deltaColor}`}>
              <TrendingUp size={12} className="mr-1" />
              {delta}
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>{icon}</div>
      </div>
    </motion.div>
  );
}

const Overview = () => {
  const {
    products,
    orders,
    salesData,
    totalRevenue,
    totalProducts,
    lowStockCount,
    avgOrderValue,
  } = useOverviewData();

  return (
    <section className="bg-neutral-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              icon={<DollarSign size={14} />}
              title={<span>Monthly Revenue</span>}
              value={`$${totalRevenue.toLocaleString()}`}
              delta={"+12.5% this month"}
              deltaColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-400"
            />

            <KpiCard
              icon={<CreditCard size={14} />}
              title={<span>Avg. Order Value</span>}
              value={`$${avgOrderValue.toLocaleString()}`}
              delta={"5.2% from last month"}
              deltaColor="text-indigo-400"
              iconBg="bg-indigo-500/10"
              iconColor="text-indigo-400"
            />

            <KpiCard
              icon={<Watch size={14} />}
              title={<span>Models in Stock</span>}
              value={totalProducts}
              delta={"4 new arrivals"}
              deltaColor="text-amber-400"
              iconBg="bg-amber-500/10"
              iconColor="text-amber-400"
            />

            <KpiCard
              icon={<AlertCircle size={14} />}
              title={<span>Low Stock</span>}
              value={lowStockCount}
              delta={"Restock needed"}
              deltaColor="text-rose-400"
              iconBg="bg-rose-500/10"
              iconColor="text-rose-400"
            />
          </div>

          <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Monthly Sales Performance
            </h4>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", color: "white" }} />
                  <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Top Selling Watches</h4>
            <div className="space-y-2">
              {products
                .slice()
                .sort((a, b) => (b.sales || 0) - (a.sales || 0))
                .slice(0, 5)
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <div>
                      <div className="text-sm font-medium">{p.title}</div>
                      <div className="text-xs text-gray-400">
                        ${""}
                        {p.price?.toLocaleString()} • {p.stock} left
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-emerald-500">+{p.sales}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;