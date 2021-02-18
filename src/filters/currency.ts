import { PriceHelper } from "@/api/helpers/priceHelper";

export function currency(price: number): string {
  return `${PriceHelper.fix2digit(price)}`;
}
