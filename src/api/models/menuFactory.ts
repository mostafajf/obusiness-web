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
    menuDto.categories = this.ListCategories(menu.Doc);
    menuDto.menuID = menu.Doc.MenuID;
    return menuDto;
  }

  ListCategories(menu): CategoryDto[] {
    const categorieDtos: CategoryDto[] = [];
    for (const category of menu.Categories) {
      const categoryDto = this.CategoryToCategoryDto(category);

      const productDtos: ProductDto[] = [];
      const productIds = category.subMenuItems.map(sub => sub.ProductID);
      const products = Object.entries(menu.Products).filter(p =>
        productIds.includes(p[0])
      );
      for (const [key, value] of products) {
        const pp: any = value;
        const pDto = {
          iD: +key,
          displayOrder: pp.displayOrder,
          fullDescription: pp.fullDescription,
          name: pp.name,
          photoUrl: pp.photoUrl,
          productCode: pp.ProductCode,
          shortDescription: pp.ShortDescription,
          status: pp.Status,
          taxRate: pp.TaxRate,
          productCategoryIDs: pp.ProductCategoryNames,
          productTagIDs: pp.ProductTagIDs
        } as ProductDto;
        pDto.modifierGroups = this.ModifierList(menu, pp, pDto);

        const categoryProduct = category.SubMenuItems.FirstOrDefault(
          sItem => sItem.ProductID == pDto.iD
        );
        pDto.price = categoryProduct.Price.Value;
        pDto.name = categoryProduct.Name;
        productDtos.push(pDto);
      }

      categoryDto.products.push(...productDtos);
      if (category.SubMenuItems.Any()) {
        categorieDtos.push(categoryDto);
      }
    }

    return categorieDtos;
  }

  CategoryToCategoryDto(category): CategoryDto {
    const categoryDto = {
      iD: category.ID,
      name: category.Name
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
    const productModifierGroups = Object.entries(menu.modifierGroups).filter(
      mg => product.modifierGroups[mg[0]]
    );
    for (const [key, value] of productModifierGroups) {
      const mgDto = this.ModifierGrouptoModifierGroupDto(key, value);
      mgDto.product = productDto;
      modifierGroupsList.push(mgDto);
    }

    return modifierGroupsList;
  }

  ModifierGrouptoModifierGroupDto(key, mg): ModifierGroupDto {
    if (mg.MaximumSelection == 0) {
      mg.MaximumSelection = null;
    }

    if (
      mg.MaximumSelection.HasValue &&
      mg.MinimumSelection.HasValue &&
      mg.MaximumSelection.Value < mg.MinimumSelection.Value
    ) {
      mg.MaximumSelection = mg.MinimumSelection;
    }

    const mgDto = {
      iD: key,
      displayOrder: mg.displayOrder,
      isAutoSel: mg.isAutoSel,
      isForceSel: mg.isForceSel,
      isSingleSel: mg.isSingleSel,
      isCollapsed: mg.isCollapsed || false,
      name: mg.name,
      isPromptSel: mg.isPromptSel || false,
      maximumSelection: mg.maximumSelection,
      minimumSelection: mg.minimumSelection,
      includeQuantity: mg.includeQuantity
    } as ModifierGroupDto;
    for (const md of mg.Modifiers.sort(
      (o1, o2) => o1.displayOrder - o2.displayOrder
    )) {
      mgDto.modifiersList.push(md as ModifierDto);
    }

    return mgDto;
  }
}
