import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
  getTotalProducts,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound, Tag } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);

  const totalCustomers = await getTotalCustomers();
  const totalProducts = await getTotalProducts();
  const graphData = await getSalesPerMonth();

  return (
    <div className="px-8 py-10 ">
      <p className="text-heading2-bold">Fishing Club Admin Dashboard</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <Card className="bg-orange-100">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-sky-700">Total Sales</CardTitle>
            <CircleDollarSign
              size={40}
              className="max-sm:hidden text-orange-500"
            />
          </CardHeader>
          <CardContent>
            <p className="text-heading3-bold text-orange-500">
              $ {totalRevenue}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-sky-100">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-sky-700">Total Orders</CardTitle>
            <ShoppingBag size={40} className="max-sm:hidden text-sky-500" />
          </CardHeader>
          <CardContent>
            <p className="text-heading3-bold text-sky-500">{totalOrders}</p>
            <Link href="/orders" className="mt-4 text-neutral-400">
              View Orders
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-neutral-200">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-sky-700">Total Products</CardTitle>
            <Tag size={40} className="max-sm:hidden text-neutral-500" />
          </CardHeader>
          <CardContent>
            <p className="text-heading3-bold text-neutral-500">
              {totalProducts}
            </p>
            <Link href="/products" className="mt-4 text-neutral-400">
              View Products
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-green-100">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-sky-700">Total Customer</CardTitle>
            <UserRound size={40} className="max-sm:hidden text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-heading3-bold text-green-500">
              {totalCustomers}
            </p>
            <Link href="/customers" className="mt-4 text-neutral-400">
              View Customers
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-sky-700">Sales Chart ($)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}
