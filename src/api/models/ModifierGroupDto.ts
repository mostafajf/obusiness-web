import { ModifierDto } from "./ModifierDto";
import { ProductDto } from "./ProductDto";
import { Constants } from "../constants/common";

export class ModifierGroupDto {
  displayOrder!: number;
  selected!: boolean;
  iD!: string;
  isAutoSel!: boolean;
  isForceSel!: boolean;
  isSingleSel!: boolean;
  name!: string;
  isPromptSel!: boolean;
  includeQuantity!: boolean;
  maximumSelection!: number;
  minimumSelection!: number;
  selectionCount!: number;
  parentModifier!: ModifierDto | null;
  modifiersList!: ModifierDto[];
  product!: ProductDto;
  maximumDisabled!: boolean;
  minimumDisabled!: boolean;
  initModifiers() {
    const intitState = this.product.initialModifiers;
    for (const modifier of this.modifiersList) {
      if (modifier.maxQty == 0) {
        modifier.maxQty = Constants.MAX_QUANTITY;
      }

      modifier.minQty = this.includeQuantity ? modifier.minQty : 1;
      if (modifier.maxQty < modifier.minQty) {
        modifier.maxQty = modifier.minQty;
      }

      if (intitState.length > 0) {
        this.selectionCount = 0;
        const find = intitState.filter(md => md.iD == modifier.iD);

        if (find.length > 0) {
          const current = find[0];
          modifier.count = current.count;
          this.selectionCount += modifier.count;
          //init sub modifiers
          for (const smg of modifier.subModifiers) {
            for (const md of smg.modifiersList) {
              smg.selectionCount = 0;
              const smfind = current.subModifiers
                .flatMap(s => s.modifiersList)
                .filter(sm => +sm.iD == md.iD);
              if (smfind.length > 0) {
                md.count = smfind[0].count;
                smg.selectionCount += modifier.count;
              }
            }
          }
        }
      }
    }

    // AutoSelectModifiers();
    // ForceSelectModifiers();
  }
  autoSelectModifiers() {
    if (this.isAutoSel && this.product.initialModifiers.length == 0) {
      this.selectionCount = this.modifiersList.filter(
        md => md.count > 0
      ).length;
      for (let index = 0; index < this.modifiersList.length; index++) {
        const modifier = this.modifiersList[index];
        if (
          (this.isSingleSel ? index == 0 : true) &&
          (!this.maximumSelection ||
            this.maximumSelection >= this.selectionCount + modifier.minQty)
        ) {
          modifier.count = modifier.minQty;
        }
      }
    }
  }

  forceSelectModifiers() {
    if (this.isForceSel) {
      this.selectionCount = this.selectionCount = this.modifiersList.filter(
        md => md.count > 0
      ).length;
      const notSelectedModifiers = this.modifiersList.filter(
        md => md.count == 0
      );
      for (const modifier of notSelectedModifiers) {
        // if MinimumSelection do not done before
        if (!this.minimumSelection) {
          this.minimumSelection = 1;
        }

        if (this.minimumSelection >= this.selectionCount + modifier.minQty) {
          modifier.count = modifier.minQty;
          if (
            this.minimumSelection <= this.selectionCount ||
            this.isSingleSel
          ) {
            return;
          }
        }
      }
    }
  }

  resetCount() {
    for (const md of this.modifiersList) {
      md.resetCount();
    }
  }

  itemValue() {
    let sum = 0;
    for (const md of this.modifiersList) {
      sum += md.itemValue();
    }

    return sum;
  }
  clone() {
    return JSON.parse(JSON.stringify(this)) as ModifierGroupDto;
  }
}
