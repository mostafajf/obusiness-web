import { IModifierGroupDto } from './IModifierGroupDto';

export interface IProductDto {
    iD: number;
    uID: string;
    productCategoryIDs: string[];
    productTagIDs: string[];
    modifierGroups: IModifierGroupDto[];
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
}