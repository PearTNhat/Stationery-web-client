import { Ticket } from "lucide-react";

type Coupon = {
  id: number;
  discount: number;
  minOrder: number;
  code: string;
  expiry: string;
};

type VoucherProps = {
  coupons: Coupon[];
  onApplyDiscount: (code: string) => void;
};

export default function Voucher({ coupons, onApplyDiscount }: VoucherProps) {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl text-blue-700 font-semibold mb-4">Available Coupons</h3>
      {coupons.map((coupon) => (
        <div key={coupon.id} className="relative p-4 mb-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-blue-600 shadow-md mr-4">
              <Ticket size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold">Save:</p>
              <p>{coupon.discount} VNĐ</p>
              <p className="font-bold">Min order:</p>
              <p>{coupon.minOrder} VNĐ</p>
              <p className="font-bold">Code:</p>
              <p className="mb-2">{coupon.code}</p>
              <p className="text-xs">Expires: {coupon.expiry}</p>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              className="w-full bg-white text-blue-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
              onClick={() => navigator.clipboard.writeText(coupon.code)}
            >
              Copy Code
            </button>
            <button
              className="w-full bg-yellow-400 text-blue-900 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition"
              onClick={() => onApplyDiscount(coupon.code)}
            >
              Apply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
