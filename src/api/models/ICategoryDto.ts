import { IProductDto } from './IProductDto';

export interface ICategoryDto {
    iD: number;
    name: string;
    products: IProductDto[];
}