import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { RadioGroup } from "@headlessui/react";
import Button from "~/components/button/Button";
import Voucher from "./Voucher";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/solid";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderDetails = {
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
};

type Province = { code: number; name: string };
type District = { code: number; name: string; wards: Ward[] };
type Ward = { code: number; name: string };
type Coupon = { id: number; code: string; discount: number; minOrder: number; expiry: string };

// New type for shipping address
type ShippingAddress = {
  id: number;
  address: string;
  phone: string;
  isDefault: boolean;
};

const sampleOrder: OrderDetails = {
  orderId: "ORD123456",
  items: [
    { id: 1, name: "Stylish Notebook", price: 200000, quantity: 1, image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg" },
    { id: 2, name: "Premium Pen", price: 150000, quantity: 2, image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg" },
  ],
  totalAmount: 200000 + 150000 * 2,
};

export default function PaymentConfirmation() {
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [useNewAddress, setUseNewAddress] = useState(false);

  // Sample list of shipping addresses
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([
    { id: 1, address: "123 Đường ABC, Phường X, Quận Y, TP Hồ Chí Minh", phone: "0987654321", isDefault: true },
    { id: 2, address: "456 Đường XYZ, Phường Z, Quận W, Hà Nội", phone: "0912345678", isDefault: false },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(shippingAddresses.find(addr => addr.isDefault)?.id || 1);

  const [customerName, setCustomerName] = useState("Nguyễn Văn A");
  const [customerPhone, setCustomerPhone] = useState("0123456789");
  const [customerEmail, setCustomerEmail] = useState("example@email.com");
  const [customerNote, setCustomerNote] = useState("");

  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showVouchers, setShowVouchers] = useState(false);
  const validDiscounts: Coupon[] = [
    { id: 1, code: "SALE10", discount: 50000, minOrder: 300000, expiry: "2025-12-31" },
    { id: 2, code: "SALE20", discount: 100000, minOrder: 500000, expiry: "2025-12-31" },
  ];

  const applyDiscount = (code?: string) => {
    const selectedCode = code || discountCode;
    const coupon = validDiscounts.find((c) => c.code === selectedCode);

    if (coupon) {
      if (sampleOrder.totalAmount >= coupon.minOrder) {
        setDiscountCode(selectedCode);
        setDiscountAmount(coupon.discount);
      } else {
        alert(`Đơn hàng cần đạt tối thiểu ${coupon.minOrder.toLocaleString()} VND`);
        setDiscountAmount(0);
      }
    } else {
      alert("Mã giảm giá không hợp lệ");
      setDiscountAmount(0);
    }
  };

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then(res => res.json())
      .then(data => setProvinces(data));
  }, []);

  useEffect(() => {
    if (!selectedProvince) return;
    fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
      .then(res => res.json())
      .then(data => setDistricts(data.districts));
  }, [selectedProvince]);

  useEffect(() => {
    if (!selectedDistrict) return;
    fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
      .then(res => res.json())
      .then(data => setWards(data.wards));
  }, [selectedDistrict]);

  const handleSaveAddress = () => {
    const provinceName = provinces.find(p => p.code.toString() === selectedProvince)?.name || "";
    const districtName = districts.find(d => d.code.toString() === selectedDistrict)?.name || "";
    const wardName = wards.find(w => w.code.toString() === selectedWard)?.name || "";
    const newAddress = `${street}, ${wardName}, ${districtName}, ${provinceName}`;

    const newShippingAddress: ShippingAddress = {
      id: shippingAddresses.length + 1,
      address: newAddress,
      phone: newPhone,
      isDefault: shippingAddresses.length === 0, // Set as default if it's the first address
    };

    setShippingAddresses([...shippingAddresses, newShippingAddress]);
    setSelectedAddressId(newShippingAddress.id);
    setUseNewAddress(false);
    setStreet("");
    setNewPhone("");
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const setDefaultAddress = (id: number) => {
    setShippingAddresses(shippingAddresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
    setSelectedAddressId(id);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-blue-800 text-center">Xác nhận thanh toán</h1>

      {/* Địa chỉ giao hàng */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Địa chỉ nhận hàng</h2>
        {!useNewAddress ? (
          <div>
            {shippingAddresses.map((addr) => (
              <div key={addr.id} className={`p-2 border rounded-lg mb-2 ${addr.id === selectedAddressId ? "bg-gray-200" : "bg-gray-100"}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p>{addr.address} {addr.isDefault && <span className="text-green-600">[Mặc định]</span>}</p>
                    <p className="text-gray-600">SĐT: {addr.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`px-2 py-1 rounded-lg ${addr.id === selectedAddressId ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    >
                      Chọn
                    </button>
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded-lg"
                      >
                        Đặt làm mặc định
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => setUseNewAddress(true)} className="mt-2 text-blue-500">+ Thêm địa chỉ mới</button>
          </div>
        ) : (
          <div>
            <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} className="w-full p-2 border rounded-lg mb-2">
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full p-2 border rounded-lg mb-2" disabled={!selectedProvince}>
              <option value="">Chọn quận/huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.code}>{d.name}</option>
              ))}
            </select>
            <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className="w-full p-2 border rounded-lg mb-2" disabled={!selectedDistrict}>
              <option value="">Chọn phường/xã</option>
              {wards.map((w) => (
                <option key={w.code} value={w.code}>{w.name}</option>
              ))}
            </select>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Nhập số nhà, tên đường"
              disabled={!selectedWard}
            />
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Nhập số điện thoại nhận hàng"
              disabled={!selectedWard}
            />
            <div className="flex justify-center mt-2 space-x-4">
              <button onClick={() => setUseNewAddress(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Hủy</button>
              <button onClick={handleSaveAddress} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Lưu địa chỉ</button>
            </div>
          </div>
        )}
      </div>

      {/* Thông tin khách hàng */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin khách hàng</h2>
        <div className="flex justify-between p-2 border rounded-lg bg-gray-100">
          <span className="font-semibold">Họ và tên:</span>
          <span>{customerName}</span>
        </div>
        <div className="flex justify-between p-2 border rounded-lg bg-gray-100 mt-2">
          <span className="font-semibold">Email:</span>
          <span>{customerEmail}</span>
        </div>
        <div className="flex justify-between p-2 border rounded-lg bg-gray-100 mt-2">
          <span className="font-semibold">Số điện thoại:</span>
          <span>{customerPhone}</span>
        </div>
        <textarea
          value={customerNote}
          onChange={(e) => setCustomerNote(e.target.value)}
          className="w-full p-2 border rounded-lg mt-2"
          placeholder="Ghi chú thêm (tùy chọn)"
        />
      </div>

      {/* Thông tin đơn hàng */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">Mã đơn hàng: <span className="text-blue-600">{sampleOrder.orderId}</span></h2>
        <div className="mt-4">
          {sampleOrder.items.map((item) => (
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
          Tổng tiền: <span className="text-red-600">{sampleOrder.totalAmount.toLocaleString()} VND</span>
        </div>
      </div>

      {/* Mã giảm giá */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Mã giảm giá</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Nhập mã giảm giá"
          />
          <button onClick={() => applyDiscount()} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Áp dụng</button>
        </div>
        <button onClick={() => setShowVouchers(!showVouchers)} className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg">Voucher của bạn</button>
        {showVouchers && (
          <div className="mt-2 p-2 border rounded-lg bg-white">
            <h3 className="text-md font-semibold">Danh sách voucher:</h3>
            <Voucher coupons={validDiscounts} onApplyDiscount={applyDiscount} />
          </div>
        )}
        {discountAmount > 0 && (
          <p className="font-semibold text-right mt-2">Giảm giá: <span className="text-blue-600">{discountAmount.toLocaleString()} VND</span></p>
        )}
        <div className="mt-4 font-semibold text-right">
          Tổng tiền sau giảm giá: <span className="text-red-600">{(sampleOrder.totalAmount - discountAmount).toLocaleString()} VND</span>
        </div>
      </div>

      {/* Phương thức thanh toán */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Phương thức thanh toán</h2>
        <RadioGroup value={selectedPayment} onChange={setSelectedPayment} className="space-y-2">
          {["COD", "Momo"].map((method) => (
            <RadioGroup.Option key={method} value={method} className="cursor-pointer">
              {({ checked }) => (
                <div className={`flex items-center p-2 border rounded-lg cursor-pointer space-x-2 ${checked ? "bg-gray-200" : "bg-gray-100"}`}>
                  <input type="radio" checked={checked} readOnly className="form-radio h-4 w-4 text-blue-600" />
                  <span>{method === "COD" ? "Thanh toán khi nhận hàng" : "Momo"}</span>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>

      {/* Nút điều hướng */}
      <div className="mt-6 text-center">
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">Xác nhận thanh toán</Button>
        </Link>
      </div>
    </div>
  );
}