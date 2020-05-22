import { ModifierGroupDto } from "./ModifierGroupDto";

export class ModifierDto {
  modifierGroupId!: number;
  status = 0;
  code = "";
  displayName!: string;
  displayOrder!: number;
  iD!: number;
  name!: string;
  linkedProductID!: string;
  price!: number;
  taxRate!: number | null;
  photoUrl!: string;
  subModifiers: ModifierGroupDto[] = [];
  isSingleSell!: boolean;
  minQty!: number | null;
  maxQty!: number | null;
}
