import { ProductDto } from "./ProductDto";

export class CategoryDto {
  constructor() {
    this.iD = 0;
    this.name = "";
    this.products = [];
  }
  iD: number;
  name: string;
  products?: ProductDto[];
}
