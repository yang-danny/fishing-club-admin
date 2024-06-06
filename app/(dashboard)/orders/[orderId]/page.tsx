import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColums";
type ShippingMethod =
  | "Standard Shipping"
  | "Express Shipping"
  | "Pickup in Club: Free";
const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();
  const getShippingMethods = (rate: string): ShippingMethod => {
    switch (rate) {
      case "shr_1PBH7lJoaV1YLzlAEmOxs1Km":
        return "Standard Shipping";
      case "shr_1PBH8hJoaV1YLzlAN9MhPoW9":
        return "Express Shipping";
      case "shr_1PBH5dJoaV1YLzlAutbzbUe6":
      default:
        return "Pickup in Club: Free";
    }
  };
  const shippingMethods = getShippingMethods(orderDetails.shippingRate);
  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold text-sky-900">
        Order ID: <span className="text-base-medium text-neutral-500">{orderDetails._id}</span>
      </p>
      <div className="bg-blue-2 flex flex-col rounded-lg p-5 gap-5">
      
      <p className="text-base-bold text-sky-900">
        Customer name: <span className="text-base-medium text-neutral-500">{customer.name}</span>
      </p>
      <p className="text-base-bold text-sky-900">
        Shipping address:{" "}
        <span className="text-base-medium text-neutral-500">
          {street}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className="text-base-bold text-sky-900">
        Total Paid:{" "}
        <span className="text-base-medium text-neutral-500">${orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold text-sky-900">
        Shipping Method:{" "}
        <span className="text-base-medium text-neutral-500">{shippingMethods}</span>
      </p>
      </div>
      
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
