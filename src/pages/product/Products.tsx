import { IAction} from "../../contexts/cart"
import { products } from "../../datasets/product"; 
import { ProductItem } from "./ProductItem";
import { useParams } from "react-router-dom";
import { categories } from "../../datasets/categories";
import { useAppContext } from "../../contexts";

export const Products = () => {
    const {cartState: {currency}, cartActionDispatcher} = useAppContext();
    
    const changeCurrency = (currency: string) => {
        const action: IAction = {
            actionName: "changeCurrency",
            data: currency
        }
        cartActionDispatcher(action);
    }
    const {categoryId} = useParams();
    const filteredProducts = products.filter((p) => p.categoryId === Number(categoryId)) || products;
    const category = categories.find((c) => c.id === Number(categoryId));
    return (
        <>
            <h1>{ category ? category.name + " | " + filteredProducts.length + " items" : "All" }</h1>
            <div style={{display: "flex", flexFlow: "row wrap"}}>
            {
                filteredProducts?.map((product) => (( <ProductItem product={product} />)))
            }
            </div>
            
        </>
    )
}