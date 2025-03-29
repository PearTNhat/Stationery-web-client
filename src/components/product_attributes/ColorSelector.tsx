import React from 'react'

type ColorSelectorProps = {
  colors: { name: string; hex: string }[]
  selectedColor: string
  onColorSelect: (color: string) => void
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onColorSelect }) => {
  const handleColorSelect = (color: string) => {
    onColorSelect(color) // Chọn màu mới
  }

  return (
    <div className='flex gap-3 mt-2'>
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => handleColorSelect(color.name)}
          className={`w-5 h-5 rounded-full border-2 transition-all ${
            selectedColor === color.name
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
