/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuDto } from "./MenuDto";
import { CategoryDto } from "./CategoryDto";
import { ProductDto } from "./ProductDto";
import { ModifierGroupDto } from "./ModifierGroupDto";
import { ModifierDto } from "./ModifierDto";

export class MenuFactory {
  ToMenuDto(menus: any[]): MenuDto[] {
    const menuDtos: MenuDto[] = [];
    for (const menu of menus) {
      menuDtos.push(this.CreateMenu(menu));
    }
    return menuDtos;
  }

  CreateMenu(menu): MenuDto {
    const menuDto = {} as MenuDto;
    menuDto.categories = this.ListCategories(menu.doc);
    menuDto.menuID = menu.doc.menuID;
    return menuDto;
  }

  ListCategories(menu): CategoryDto[] {
    const categoryDtos: CategoryDto[] = [];
    for (const category of menu.categories) {
      const categoryDto = this.CategoryToCategoryDto(category);

      const productDtos: ProductDto[] = [];
      const productIds = category.subMenuItems.map(sub => sub.productID);

      const products = Object.entries(menu.products).filter(p =>
        productIds.includes(+p[0])
      );
      for (const [key, value] of products) {
        const pp: any = value;
        const pDto = new ProductDto(pp);

        pDto.iD = +key;
        pDto.modifierGroups = this.ModifierList(menu, pp, pDto);

        const categoryProduct = category.subMenuItems.filter(
          sItem => sItem.productID == pDto.iD
        )[0];
        pDto.price = categoryProduct.price;
        pDto.name = categoryProduct.name;
        productDtos.push(pDto);
      }

      categoryDto.products.push(...productDtos);
      if (category.subMenuItems.length > 0) {
        categoryDtos.push(categoryDto);
      }
    }

    return categoryDtos;
  }

  CategoryToCategoryDto(category): CategoryDto {
    const categoryDto = {
      iD: category.id,
      name: category.name,
      products: []
    } as CategoryDto;

    return categoryDto;
  }

  ModifierList(
    menu: any,
    product: any,
    productDto: ProductDto
  ): ModifierGroupDto[] {
    const modifierGroupsList: ModifierGroupDto[] = [];
    //sort
    const productModifierGroups = Object.entries(
      menu.modifierGroups
    ).filter(mg => product.modifierGroups.includes(mg[0]));
    for (const [key, value] of productModifierGroups) {
      const mgDto = this.ModifierGrouptoModifierGroupDto(key, value);
      mgDto.productId = `${productDto.iD}`;
      modifierGroupsList.push(mgDto);
    }

    return modifierGroupsList;
  }

  ModifierGrouptoModifierGroupDto(key, mg): ModifierGroupDto {
    if (mg.maximumSelection < mg.minimumSelection) {
      mg.maximumSelection = mg.minimumSelection;
    }
    const mgDto = new ModifierGroupDto({
      iD: key,
      displayOrder: mg.displayOrder,
      isAutoSel: mg.isAutoSel,
      isForceSel: mg.isForceSel,
      isSingleSel: mg.isSingleSel,
      name: mg.name,
      isPromptSel: mg.isPromptSel || false,
      maximumSelection: mg.maximumSelection,
      minimumSelection: mg.minimumSelection,
      includeQuantity: mg.includeQuantity,
      modifiersList: []
    });
    for (const md of mg.modifiers.sort(
      (o1, o2) => o1.displayOrder - o2.displayOrder
    )) {
      const modifier = new ModifierDto(md);
      modifier.modifierGroupId = mgDto.iD;
      mgDto.modifiersList.push(modifier);
    }

    return mgDto;
  }
}
