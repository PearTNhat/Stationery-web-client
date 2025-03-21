import { useState } from "react";

export default function CustomerInfo() {
  const [customerName] = useState("Nguyễn Văn A");
  const [customerPhone] = useState("0123456789");
  const [customerEmail] = useState("example@email.com");
  const [customerNote, setCustomerNote] = useState("");

  return (
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
  );
}