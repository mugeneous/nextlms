export function currencyFormat(price: number) {
  return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
}
