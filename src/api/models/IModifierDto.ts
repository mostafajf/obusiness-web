import { IModifierGroupDto } from './IModifierGroupDto';

export interface IModifierDto {
    modifierGroupId: number;
    oldState: number | null;
    status: number;
    code: string;
    displayName: string;
    displayOrder: number;
    iD: number;
    name: string;
    linkedProductID: string;
    price: number;
    taxRate: number | null;
    photoUrl: string;
    subModifiers: IModifierGroupDto[];
    modifierGroup: IModifierGroupDto;
    isSingleSell: boolean;
    minQty: number | null;
    maxQty: number | null;
}