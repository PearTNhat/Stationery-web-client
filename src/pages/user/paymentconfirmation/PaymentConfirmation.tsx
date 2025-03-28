import { useState } from "react";
import { Link } from "@inertiajs/react";
import Button from "~/components/button/Button";
import ShippingAddress from "./ShippingAddress";
import CustomerInfo from "./CustomerInfo";
import OrderSummary from "./OrderSummary";
import DiscountSection from "./DiscountSection";
import PaymentMethod from "./PaymentMethod";

const sampleOrder = {
  orderId: "ORD123456",
  items: [
    { id: 1, name: "Stylish Notebook", price: 200000, quantity: 1, image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg" },
    { id: 2, name: "Premium Pen", price: 150000, quantity: 2, image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg" },
  ],
  totalAmount: 200000 + 150000 * 2,
};

export default function PaymentConfirmation() {
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-16">
      <h1 className="text-3xl font-bold text-blue-800 text-center">Xác nhận thanh toán</h1>
      <ShippingAddress />
      <CustomerInfo />
      <OrderSummary order={sampleOrder} />
      <DiscountSection
        orderTotal={sampleOrder.totalAmount}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        discountAmount={discountAmount}
        setDiscountAmount={setDiscountAmount}
      />
      <PaymentMethod selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
      <div className="mt-6 text-center">
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">Xác nhận thanh toán</Button>
        </Link>
      </div>
    </div>
  );
}