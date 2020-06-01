import { ModifierGroupDto } from "./ModifierGroupDto";
import { ModifierDto } from "./ModifierDto";

export class ProductDto {
  iD!: number;
  uID!: string;
  productCategoryIDs!: string[];
  productTagIDs!: string[];
  modifierGroups!: ModifierGroupDto[];
  displayOrder!: string;
  fullDescription!: string;
  name!: string;
  photoUrl!: string;
  productCode!: string;
  shortDescription!: string;
  status!: number;
  taxRate!: number;
  price!: number;
  isRedemption!: boolean;
  count!: 0;
  initialModifiers!: ModifierDto[];
  clone() {
    return JSON.parse(JSON.stringify(this)) as ProductDto;
  }
}
