import { useState, useEffect } from 'react'
import { FaHome, FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import { FaSquarePhone } from 'react-icons/fa6'
import { TiDelete } from 'react-icons/ti'
import { apiAddAddress, apiDeleteAddress, apiSetDefaultAddress } from '~/api/address'
import { useAppSelector } from '~/hooks/redux'

type Province = { code: number; name: string }
type District = { code: number; name: string; wards: Ward[] }
type Ward = { code: number; name: string }

type ShippingAddressType = {
  addressId: string
  addressName: string
  phone: string
  isDefault: boolean
}

type ShippingAddressProps = {
  userData: {
    addresses?: any[]
  }
  setSelectedShippingInfo: (info: { addressName: string; phone: string }) => void
}

export const ShippingAddress: React.FC<ShippingAddressProps> = ({ userData, setSelectedShippingInfo }) => {
  console.log('userData in ShippingAddress', userData)
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [error, setError] = useState<string | null>(null)
  const { accessToken } = useAppSelector((state) => state.user)

  const [localAddresses, setLocalAddresses] = useState<ShippingAddressType[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [isDeleteMode, setIsDeleteMode] = useState(false)

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [street, setStreet] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [useNewAddress, setUseNewAddress] = useState(false)

  useEffect(() => {
    console.log('userData.addresses in ShippingAddress:', userData?.addresses)
    if (Array.isArray(userData?.addresses)) {
      const mapped = userData.addresses.map((addr: any) => ({
        addressId: addr.addressID ?? addr.addressId ?? '',
        addressName: addr.addressName ?? '',
        phone: addr.phone ?? '',
        isDefault: addr.isDefault ?? addr.default ?? addr.is_default ?? false
      }))
      console.log('Mapped localAddresses:', mapped)
      setLocalAddresses(mapped)
      const defaultAddress = mapped.find((addr) => addr.isDefault)
      setSelectedAddressId((prev) => prev || defaultAddress?.addressId || mapped[0]?.addressId || '')
    }
  }, [userData?.addresses])

  useEffect(() => {
    const selected = localAddresses.find((addr) => addr.addressId === selectedAddressId)
    if (selected) {
      setSelectedShippingInfo({ addressName: selected.addressName, phone: selected.phone })
    }
  }, [selectedAddressId, localAddresses])

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch(() => setError('Failed to load provinces. Please try again later.'))
  }, [])

  useEffect(() => {
    if (!selectedProvince) return
    fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts || []))
      .catch(() => setError('Failed to load districts. Please try again later.'))
  }, [selectedProvince])

  useEffect(() => {
    if (!selectedDistrict) return
    fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
      .then((res) => res.json())
      .then((data) => setWards(data.wards || []))
      .catch(() => setError('Failed to load wards. Please try again later.'))
  }, [selectedDistrict])

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return

    const result = await apiDeleteAddress({ addressId: id, accessToken: accessToken || '' })

    if (typeof result === 'string') {
      alert(`Failed to delete address: ${result}`)
      return
    }

    setLocalAddresses((prev) => prev.filter((addr) => addr.addressId !== id))

    // Nếu đang chọn địa chỉ này thì chuyển qua cái khác
    if (id === selectedAddressId) {
      const remaining = localAddresses.filter((addr) => addr.addressId !== id)
      setSelectedAddressId(remaining[0]?.addressId || '')
    }
  }

  const handleSaveAddress = async () => {
    if (!selectedProvince || !selectedDistrict || !selectedWard || !street || !newPhone) {
      alert('Please fill out all address fields and phone number.')
      return
    }

    const provinceName = provinces.find((p) => p.code.toString() === selectedProvince)?.name || ''
    const districtName = districts.find((d) => d.code.toString() === selectedDistrict)?.name || ''
    const wardName = wards.find((w) => w.code.toString() === selectedWard)?.name || ''
    const fullAddress = `${street}, ${wardName}, ${districtName}, ${provinceName}`

    const addressId = Date.now().toString()
    const result = await apiAddAddress({
      addressId,
      addressName: fullAddress,
      phone: newPhone,
      isDefault: false,
      accessToken: accessToken || ''
    })

    if (typeof result === 'string') {
      alert(`Failed to save address: ${result}`)
      return
    }

    const newAddress: ShippingAddressType = {
      addressId,
      addressName: fullAddress,
      phone: newPhone,
      isDefault: false
    }

    setLocalAddresses((prev) => [...prev, newAddress])
    setSelectedAddressId(addressId)
    resetNewAddressForm()
  }

  const resetNewAddressForm = () => {
    setUseNewAddress(false)
    setSelectedProvince('')
    setSelectedDistrict('')
    setSelectedWard('')
    setStreet('')
    setNewPhone('')
  }

  const handleSetDefault = async (id: string) => {
    const result = await apiSetDefaultAddress({ addressId: id, accessToken: accessToken || '' })

    if (typeof result === 'string') {
      alert(`Failed to set default: ${result}`)
      return
    }

    setLocalAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: addr.addressId === id })))
    setSelectedAddressId(id)
  }

  const sortedAddresses = [...localAddresses].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))

  return (
    <div className='mt-6 bg-gray-100 p-4 rounded-lg'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4 flex justify-between items-center'>
        Shipping Addresses
        <div className='space-x-2'>
          {!isDeleteMode && (
            <button
              onClick={() => setIsDeleteMode(true)}
              className='px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200'
            >
              Delete
            </button>
          )}
          {isDeleteMode && (
            <button
              onClick={() => setIsDeleteMode(false)}
              className='px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300'
            >
              Cancel
            </button>
          )}
        </div>
      </h2>

      {error && <p className='text-red-500'>{error}</p>}

      {!useNewAddress ? (
        <div>
          {sortedAddresses.length > 0 ? (
            sortedAddresses.map((addr) => (
              <div
                key={addr.addressId}
                className={`relative p-4 border rounded-xl mb-3 transition ${
                  addr.addressId === selectedAddressId ? 'bg-blue-50 border-blue-300' : 'bg-gray-50'
                }`}
              >
                {isDeleteMode && (
                  <button
                    onClick={() => handleDeleteAddress(addr.addressId)}
                    className='absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white p-1 rounded-full shadow-sm'
                  >
                    <TiDelete />
                  </button>
                )}

                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium text-gray-800 flex items-center gap-2 break-words'>
                      {addr.addressName}
                      {addr.isDefault && (
                        <span className='inline-block bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs'>
                          Default
                        </span>
                      )}
                    </p>
                    <p className='text-gray-600 flex items-center gap-1 mt-1'>
                      <FaSquarePhone className='text-sm' />
                      {addr.phone}
                    </p>
                  </div>

                  {!isDeleteMode && (
                    <div className='flex flex-wrap gap-2'>
                      <button
                        onClick={() => setSelectedAddressId(addr.addressId)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                          addr.addressId === selectedAddressId
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {addr.addressId === selectedAddressId ? (
                          <>
                            <FaCheckCircle />
                            Selected
                          </>
                        ) : (
                          <>
                            <FaRegCircle />
                            Select
                          </>
                        )}
                      </button>

                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefault(addr.addressId)}
                          className='flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700'
                        >
                          <FaHome className='text-sm' />
                          Set Default
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-600'>No saved addresses found.</p>
          )}

          <button onClick={() => setUseNewAddress(true)} className='mt-2 text-blue-500'>
            + Add new address
          </button>
        </div>
      ) : (
        <div>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className='w-full p-2 border rounded-lg mb-2'
          >
            <option value=''>Select province</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className='w-full p-2 border rounded-lg mb-2'
            disabled={!selectedProvince}
          >
            <option value=''>Select district</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className='w-full p-2 border rounded-lg mb-2'
            disabled={!selectedDistrict}
          >
            <option value=''>Select ward</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
            ))}
          </select>

          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className='w-full p-2 border rounded-lg mb-2'
            placeholder='Street name, house number'
          />
          <input
            type='text'
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className='w-full p-2 border rounded-lg mb-2'
            placeholder='Recipient phone number'
          />

          <div className='flex justify-center mt-2 space-x-4'>
            <button onClick={resetNewAddressForm} className='px-4 py-2 bg-gray-500 text-white rounded-lg'>
              Cancel
            </button>
            <button onClick={handleSaveAddress} className='px-4 py-2 bg-blue-500 text-white rounded-lg'>
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
