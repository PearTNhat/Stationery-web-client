import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Color } from '~/types/product'

type ColorSelectorProps = {
  colors: Color[]
  selectedColor: string | null
  onColorSelect: (color: string) => void
  currentParams: { colorId: string | null }
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, currentParams }) => {
  const [, setSearchParams] = useSearchParams()
  const handleColorSelect = (color: string) => {
    setSearchParams({ ...currentParams, colorId: color })
  }

  return (
    <div className='flex gap-3 mt-2'>
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => handleColorSelect(color.name)}
          className={`w-5 h-5 rounded-full border-2 transition-all ${
            currentParams.colorId === color.colorId
              ? 'border-black scale-110 ring-1 ring-offset-1 ring-black'
              : 'border-transparent'
          }`}
          style={{ backgroundColor: color.hex }}
        ></button>
      ))}
    </div>
  )
}

export default ColorSelector
