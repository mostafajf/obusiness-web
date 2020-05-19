import { ModifierGroupDto } from "./ModifierGroupDto";

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
}
