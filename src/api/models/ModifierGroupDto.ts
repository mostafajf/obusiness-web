import { ModifierDto } from "./ModifierDto";
import { ProductDto } from "./ProductDto";

export class ModifierGroupDto {
  displayOrder!: number | null;
  selected!: boolean;
  iD!: string;
  isAutoSel!: boolean;
  isForceSel!: boolean;
  isSingleSel!: boolean;
  name!: string;
  isPromptSel!: boolean;
  isSeen!: boolean;
  isCollapsed!: boolean;
  includeQuantity!: boolean;
  maximumSelection!: number | null;
  minimumSelection!: number | null;
  selectionCount!: number;
  parentModifier!: ModifierDto;
  modifiersList!: ModifierDto[];
  productId!: number;
}
