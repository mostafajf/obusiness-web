import { ModifierGroupDto } from "./ModifierGroupDto";
import { ModifierDto } from "./ModifierDto";
import { Constants } from "../constants/common";
import { PriceHelper } from "../helpers/priceHelper";

export class ProductDto {
  uuid: string;
  iD: number;
  uiD: string;
  productCategoryiDs: string[];
  productTagiDs: string[];
  modifierGroups: ModifierGroupDto[];
  displayOrder: string;
  fullDescription: string;
  name: string;
  photoUrl: string;
  productCode: string;
  shortDescription: string;
  status: number;
  taxRate: number;
  price: number;
  isRedemption: boolean;
  count: number;
  initialModifiers: ModifierDto[];
  /**
   *
   */
  constructor(json) {
    this.count = json._count || 1;
    this.displayOrder = json.displayOrder || 1;
    this.fullDescription = json.fullDescription || 1;
    this.iD = json.iD || 1;
    this.initialModifiers = json.initialModifiers || [];
    this.isRedemption = json.isRedemption || false;
    this.name = json.name || "";
    this.photoUrl = json.photoUrl || "";
    this.price = json.price || 0;
    this.productCategoryiDs = json.productCategoryiDs || [];
    this.productCode = json.productCode || "";
    this.productTagiDs = json.productTagiDs || [];
    this.shortDescription = json.shortDescription || 1;
    this.status = json.status || 1;
    this.taxRate = json.taxRate || 0;
    this.uiD = json.uiD || "";
    this.uuid = json.uuid || "";
    this.modifierGroups = [];
    if (json.modifierGroups)
      this.modifierGroups = json.modifierGroups.map(
        mg => new ModifierGroupDto(mg)
      );
  }
  get modifiers() {
    return this.modifierGroups.flatMap(mg => mg.modifiersList);
  }
  get selectedModifiers() {
    return this.modifierGroups
      .flatMap(mg => mg.modifiersList)
      .filter(md => md.isSelected);
  }
  clone() {
    return JSON.parse(JSON.stringify(this)) as ProductDto;
  }
  get itemValue() {
    let sum = this.price;
    for (const mg of this.modifierGroups) {
      sum += mg.itemValue();
    }
    sum = sum * this.count;
    return PriceHelper.fix2digit(sum);
  }
  resetCount() {
    this.count = 1;
    for (const mg of this.modifierGroups) {
      mg.resetCount();
      mg.initModifiers(this.initialModifiers);
    }
  }
  static equals(first: ProductDto, other: ProductDto) {
    if (first.iD != other.iD) {
      return false;
    }
    if (first.modifiers.length != other.modifiers.length) {
      return false;
    }
    for (let i = 0; i < first.modifiers.length; i++) {
      const found = other.modifiers.filter(
        md =>
          md.iD == first.modifiers[i].iD &&
          other.modifiers.length == first.modifiers.length
      );
      if (found.length == 0) {
        return false;
      } else {
        for (let j = 0; j < first.modifiers[i].subModifiers.length; j++) {
          const sfound = found[0].subModifiers.some(
            md =>
              md.iD == first.modifiers[i].subModifiers[j].iD &&
              found[0].subModifiers.length ==
                first.modifiers[i].subModifiers.length
          );
          if (!sfound) {
            return false;
          }
        }
      }
    }

    return true;
  }
  get decCanExecute(): boolean {
    return this.count > 1;
  }

  decExecute() {
    this.count--;
  }

  get incCanExecute(): boolean {
    return this.count < Constants.MAX_QUANTITY;
  }

  incExecute() {
    this.count++;
  }
}
