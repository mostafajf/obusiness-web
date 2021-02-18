import { ModifierGroupDto } from "./ModifierGroupDto";
import { Constants } from "../constants/common";
import { CommonHelper } from "../helpers/commonHelper";

export class ModifierDto {
  constructor(json) {
    this.modifierGroupId = json.modifierGroupId || "";
    this.count = json._count || 0;
    this.code = json.code || 0;
    this.displayName = json.displayName || "";
    this.displayOrder = json.displayOrder || 0;
    // TODO: remove auto id in production
    this.iD = json.iD || CommonHelper.uuid();
    this.linkedProductID = json.linkedProductID || "";
    this.maxQty = json.maxQty || Constants.MAX_QUANTITY;
    this.minQty = json.minQty || 1;
    this.code = json.code || 0;
    this.name = json.name || "";
    this.photoUrl = json.photoUrl || "";
    this.price = json.price || 0;
    this.status = json.status || 1;
    this.subModifiers = [];
    this.taxRate = json.taxRate || 0;
  }
  //navigation
  modifierGroupId!: string;
  _isSelected = false;
  get isSelected(): boolean {
    return this._isSelected || this.count > 0;
  }
  set isSelected(val: boolean) {
    this._isSelected = val;
    if (val) this.count++;
    else this.count--;
    if (this.count < 0) this.count = 0;
  }
  status = 1;
  code = 0;
  displayName = "";
  displayOrder = 1;
  iD = 1;
  name = "";
  linkedProductID = "";
  price = 0;
  taxRate = 0;
  photoUrl = "";
  subModifiers: ModifierGroupDto[];
  minQty = 0;
  maxQty = 0;
  _count = 0;
  get count() {
    return this._count;
  }
  set count(c: number) {
    this._count = c;
  }

  DecCanExecute(mg: ModifierGroupDto): boolean {
    return this.isDisableDecreament(mg);
  }

  DecExecute() {
    if (this.count == this.minQty) {
      this.count = 0;
    } else {
      this.count--;
    }
  }

  incCanExecute(mg: ModifierGroupDto): boolean {
    return this.isDisableIncreament(mg);
  }

  increaseQuantity(mg: ModifierGroupDto) {
    if (mg.isSingleSel) {
      const otherModifiers = mg.modifiersList.filter(m => m.iD != this.iD);
      for (const md of otherModifiers) {
        md.count = 0;
        md.isSelected = false;
      }
    }
    if (this.count == 0 && this.minQty > 0) {
      this.count = this.minQty;
    } else {
      this.count += 1;
    }
  }
  isDisableIncreament(mg: ModifierGroupDto): boolean {
    return (this.maxQty <= this.count ||
      (mg.isSingleSel && this.count === 0 && mg.maximumDisabled) ||
      (this.count === 0 &&
        mg.isSingleSel &&
        mg.maximumSelection &&
        mg.selectionCount + this.minQty > mg.maximumSelection)) as boolean;
  }

  isDisableDecreament(mg: ModifierGroupDto): boolean {
    return (
      this.count == 0 ||
      (mg.maximumDisabled && this.count == 0) ||
      mg.minimumDisabled ||
      (mg.isForceSel &&
        this.count == this.minQty &&
        mg.selectionCount - this.minQty < mg.minimumSelection)
    );
  }

  checkMaximumSelection(mg: ModifierGroupDto) {
    mg.selectionCount = mg.modifiersList.reduce((acc, md) => acc + md.count, 0);
    if (mg.maximumSelection && mg.selectionCount >= mg.maximumSelection) {
      mg.maximumDisabled = true;
    } else {
      mg.maximumDisabled = false;
    }
  }

  checkMinimumSelection(mg: ModifierGroupDto) {
    if (mg.isForceSel) {
      mg.selectionCount = mg.modifiersList.reduce(
        (acc, md) => acc + md.count,
        0
      );
      if (mg.minimumSelection) {
        mg.minimumSelection = 1;
      }

      if (mg.selectionCount <= mg.minimumSelection) {
        mg.minimumDisabled = true;
      } else {
        mg.minimumDisabled = false;
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
    this.isSelected = false;
    for (const mg of this.subModifiers) {
      mg.resetCount();
    }
  }
}
