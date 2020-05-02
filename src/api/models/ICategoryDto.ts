import { IProductDto } from './ProductDto';

export interface ICategoryDto {
    iD: number;
    name: string;
    products: IProductDto[];
}