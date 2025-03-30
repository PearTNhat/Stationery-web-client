import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { FaRegStarHalfStroke } from 'react-icons/fa6'

const formatNumber = (number: number | string) => {
  const numberParse: number = Number(number)
  if (!numberParse || numberParse === 0) {
    return 0
  }
  return numberParse.toLocaleString('de-DE')
}

const convertNumberToStar = (number: number) => {
  if (!number) {
    return new Array(5).fill(React.createElement(FaRegStar))
  }
  number = Number(number)
  const stars = []
  for (let i = 1; i <= number; i++) {
    stars.push(React.createElement(FaStar))
  }
  if (number !== 0 && number % Math.floor(number) !== 0) {
    stars.push(React.createElement(FaRegStarHalfStroke))
    number++
  }
  for (let i = 5; i > number; i--) {
    stars.push(React.createElement(FaRegStar))
  }
  return stars
}
const calculatePercent = (price: number, priceDiscount: number) => {
  if (price === 0 || !price || priceDiscount === 0 || !priceDiscount) {
    return 0
  }
  return Math.round(((price - priceDiscount) / price) * 100)
}
export { formatNumber, convertNumberToStar, calculatePercent }
