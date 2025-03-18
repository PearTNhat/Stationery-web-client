// components/payment/ShippingAddress.tsx
import React, { useState, useEffect } from "react";
import { Province, District, Ward, ShippingAddressType } from "~/constance/seed/payment"; // Use renamed type

type ShippingAddressProps = {
  shippingAddresses: ShippingAddressType[];
  setShippingAddresses: (addresses: ShippingAddressType[]) => void;
  selectedAddressId: number;
  setSelectedAddressId: (id: number) => void;
};

export const ShippingAddress: React.FC<ShippingAddressProps> = ({
  shippingAddresses,
  setShippingAddresses,
  selectedAddressId,
  setSelectedAddressId,
}) => {
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (!selectedProvince) return;
    fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts));
  }, [selectedProvince]);

  useEffect(() => {
    if (!selectedDistrict) return;
    fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
      .then((res) => res.json())
      .then((data) => setWards(data.wards));
  }, [selectedDistrict]);

  const handleSaveAddress = () => {
    const provinceName = provinces.find((p) => p.code.toString() === selectedProvince)?.name || "";
    const districtName = districts.find((d) => d.code.toString() === selectedDistrict)?.name || "";
    const wardName = wards.find((w) => w.code.toString() === selectedWard)?.name || "";
    const newAddress = `${street}, ${wardName}, ${districtName}, ${provinceName}`;

    const newShippingAddress: ShippingAddressType = {
      id: shippingAddresses.length + 1,
      address: newAddress,
      phone: newPhone,
      isDefault: shippingAddresses.length === 0,
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
    setShippingAddresses(
      shippingAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    setSelectedAddressId(id);
  };

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Địa chỉ nhận hàng</h2>
      {!useNewAddress ? (
        <div>
          {shippingAddresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-2 border rounded-lg mb-2 ${
                addr.id === selectedAddressId ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    {addr.address}{" "}
                    {addr.isDefault && <span className="text-green-600">[Mặc định]</span>}
                  </p>
                  <p className="text-gray-600">SĐT: {addr.phone}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`px-2 py-1 rounded-lg ${
                      addr.id === selectedAddressId ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
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
          <button onClick={() => setUseNewAddress(true)} className="mt-2 text-blue-500">
            + Thêm địa chỉ mới
          </button>
        </div>
      ) : (
        <div>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            disabled={!selectedProvince}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            disabled={!selectedDistrict}
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
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
            <button
              onClick={() => setUseNewAddress(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Hủy
            </button>
            <button
              onClick={handleSaveAddress}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Lưu địa chỉ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};