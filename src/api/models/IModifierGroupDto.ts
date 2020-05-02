import { IModifierDto } from './IModifierDto';
import { IProductDto } from './IProductDto';

export interface IModifierGroupDto {
    displayOrder: number | null;
    selected: boolean;
    iD: string;
    isAutoSel: boolean;
    isForceSel: boolean;
    isSingleSel: boolean;
    name: string;
    isPromptSel: boolean;
    isSeen: boolean;
    isCollapsed: boolean;
    includeQuantity: boolean;
    maximumSelection: number | null;
    minimumSelection: number | null;
    selectionCount: number;
    parentModifier: IModifierDto;
    modifiersList: IModifierDto[];
    product: IProductDto;
}