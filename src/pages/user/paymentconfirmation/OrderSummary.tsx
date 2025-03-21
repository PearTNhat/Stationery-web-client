type OrderItem = { id: number; name: string; price: number; quantity: number; image: string };
type OrderDetails = { orderId: string; items: OrderItem[]; totalAmount: number };

export default function OrderSummary({ order }: { order: OrderDetails }) {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Mã đơn hàng: <span className="text-blue-600">{order.orderId}</span></h2>
      <div className="mt-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">Số lượng: {item.quantity}</p>
              </div>
            </div>
            <p className="text-blue-600 font-semibold">{(item.price * item.quantity).toLocaleString()} VND</p>
          </div>
        ))}
      </div>
      <div className="mt-4 font-semibold text-right">
        Tổng tiền: <span className="text-red-600">{order.totalAmount.toLocaleString()} VND</span>
      </div>
    </div>
  );
}