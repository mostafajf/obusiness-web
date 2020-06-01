import { ModifierGroupDto } from "./ModifierGroupDto";
import { Constants } from "../constants/common";

export class ModifierDto {
  constructor() {
    this.minQty = 1;
    this.maxQty = Constants.MAX_QUANTITY;
  }
  modifierGroup!: ModifierGroupDto;
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
  minQty!: number;
  maxQty!: number;
  _count!: number;
  get count() {
    return this._count;
  }
  set count(c: number) {
    this._count = c;
    this.checkMaximumSelection();
    this.checkMinimumSelection();
  }
  get isSingleSell(): boolean {
    return !(this.maxQty >= this.minQty && this.maxQty > 1);
  }
  get calculatedPrice(): number {
    if (!this.price) {
      return 0;
    } else {
      return this.count * this.price;
    }
  }
  DecCanExecute(): boolean {
    return !this.isDisableDecreament();
  }

  DecExecute() {
    if (this.count == this.minQty) {
      this.count = 0;
    } else {
      this.count--;
    }
  }

  incCanExecute(): boolean {
    return !this.isDisableIncreament();
  }

  increaseQuantity() {
    if (this.modifierGroup.isSingleSel) {
      const otherModifiers = this.modifierGroup.modifiersList.filter(
        m => m.iD != this.iD
      );
      for (const md of otherModifiers) {
        md.count = 0;
      }
    }
    if (this.count == 0 && this.minQty > 0) {
      this.count = this.minQty;
    } else {
      this.count += 1;
    }
  }
  isDisableIncreament(): boolean {
    return (this.maxQty <= this.count ||
      (!(this.modifierGroup.isSingleSel && this.count === 0) &&
        this.modifierGroup.maximumDisabled) ||
      (this.count === 0 &&
        !this.modifierGroup.isSingleSel &&
        this.modifierGroup.maximumSelection &&
        this.modifierGroup.selectionCount + this.minQty >
          this.modifierGroup.maximumSelection)) as boolean;
  }

  isDisableDecreament(): boolean {
    return (
      this.count == 0 ||
      (this.modifierGroup.maximumDisabled && this.count == 0) ||
      this.modifierGroup.minimumDisabled ||
      (this.modifierGroup.isForceSel &&
        this.count == this.minQty &&
        this.modifierGroup.selectionCount - this.minQty <
          this.modifierGroup.minimumSelection)
    );
  }

  checkMaximumSelection() {
    this.modifierGroup.selectionCount = this.modifierGroup.modifiersList.Sum(
      md => md.Count
    );
    if (
      this.modifierGroup.maximumSelection &&
      this.modifierGroup.selectionCount >= this.modifierGroup.maximumSelection
    ) {
      this.modifierGroup.maximumDisabled = true;
    } else {
      this.modifierGroup.maximumDisabled = false;
    }
  }

  checkMinimumSelection() {
    if (this.modifierGroup.isForceSel) {
      this.modifierGroup.selectionCount = this.modifierGroup.modifiersList.reduce(
        (acc, md) => acc + md.count,
        0
      );
      if (!this.modifierGroup.minimumSelection) {
        this.modifierGroup.minimumSelection = 1;
      }

      if (
        this.modifierGroup.selectionCount <= this.modifierGroup.minimumSelection
      ) {
        this.modifierGroup.minimumDisabled = true;
      } else {
        this.modifierGroup.minimumDisabled = false;
      }
    }
  }
  resetSubModifiersCount() {
    for (const item of this.subModifiers) {
      item.resetCount();
    }
  }

  itemValue() {
    if (this.count <= 0) {
      return 0;
    }

    let sum = this.price;
    for (const sm of this.subModifiers) {
      sum += sm.itemValue();
    }

    return sum * this.count;
  }
  resetCount() {
    this.count = 0;
    for (const mg of this.subModifiers) {
      mg.resetCount();
    }
  }
}
