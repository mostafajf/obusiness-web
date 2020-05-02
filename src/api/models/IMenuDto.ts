import { ICategoryDto } from './ICategoryDto';

export interface IMenuDto {
    menuID: number;
    categories: ICategoryDto[];
}