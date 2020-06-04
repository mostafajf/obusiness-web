export class PriceHelper {
  static fix2digit(value) {
    return Number(parseFloat(value).toFixed(2));
  }
  static computeItemTax(price, tax) {
    return price - (price * 100) / (tax * 100 + 100);
  }
  static calculateUnitPriceTax(item, productTax) {
    const mdTaxRate = item.taxRate ? item.taxRate : productTax;
    return this.fix2digit(this.computeItemTax(item.price, mdTaxRate));
  }
}
