const formatNumber = (number: number | string) => {
  const numberParse: number = Number(number)
  if (!numberParse || numberParse === 0) {
    return 0
  }
  return numberParse.toLocaleString('de-DE')
}
export { formatNumber }
