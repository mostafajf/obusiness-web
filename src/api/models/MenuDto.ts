import { CategoryDto } from "./CategoryDto";

export class MenuDto {
  constructor() {
    this.menuID = 0;
    this.categories = [];
  }
  menuID: number;
  categories: CategoryDto[];
}
