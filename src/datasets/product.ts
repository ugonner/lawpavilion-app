import { IProduct } from "../interfaces/product";

export const products: IProduct[] = [
    {
        id: 1,
        name: "Gum",
        imageUrl: "assets/images/logo512.png",
        price: "300",
        sizes: ["L", "XL", "XXL"],
        colors: ["red", "green"],
        quantity: 4,
        productImages: [
            "assets/images/logo512.png",
            "assets/images/logo512.png",
            "assets/images/logo512.png"
        ],
        categoryId: 1,
        productCategory: "shoe"
    },{
        id: 2,
        name: "Gum2",
        imageUrl: "assets/images/logo512.png",
        price: "300",
        sizes: ["L", "XL", "XXL"],
        colors: ["red", "green"],
        quantity: 4,
        productImages: [
            "assets/images/logo512.png",
            "assets/images/logo512.png",
            "assets/images/logo512.png"
        ],
        categoryId: 2,
        productCategory: "shoe"
    },{
        id: 3,
        name: "Gum3",
        imageUrl: "assets/images/logo512.png",
        price: "300",
        sizes: ["L", "XL", "XXL"],
        colors: ["red", "green"],
        quantity: 4,
        productImages: [
            "assets/images/logo512.png",
            "assets/images/logo512.png",
            "assets/images/logo512.png"
        ],
        categoryId: 1,
        productCategory: "Bag"
    }
]