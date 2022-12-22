import { Settings } from "http2";
import { NumberLiteralType } from "typescript";

export interface IProduct {
    id: number;
    name?: string;
    imageUrl?: string;
    price?: string;
    colors: string[];
    sizes: string[];
    quantity: number;
    productImages: string[];
    categoryId: number;
    productCategory: string;
}
export interface ICartProduct{
    productId: number;
    colors: string;
    sizes: string;
    quantity: number;
    price: string;
}
export interface ICategory{
    id: number;
    name: string;
}