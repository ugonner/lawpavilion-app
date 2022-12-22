import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../../contexts";
import { IAction} from "../../contexts/cart"
import { ICartProduct, IProduct } from "../../interfaces/product";
import { formatCurrency } from "../../utils";


interface IProductItem{
    product: IProduct
}
export const ProductItem = ({product}: IProductItem) => {
    const {cartState: {currency, cartProducts}, cartActionDispatcher} = useAppContext();
    const navigate = useNavigate();

    const addToCart = () => {
        const cartProduct: ICartProduct = {
            productId: product.id,
            sizes: "NA",
            colors: "NA",
            quantity: 1,
            price: product.price as string
        }
        const action: IAction = {
            actionName: "addToCart",
            data: cartProduct
        }
        cartActionDispatcher(action);
    }
    const removeFromCart = () => {
        const cartProduct: ICartProduct = {
            productId: product.id,
            sizes: "NA",
            colors: "NA",
            quantity: 1,
            price: product.price as string
        }
        const action: IAction = {
            actionName:"removeFromCart",
            data: cartProduct
        }
        cartActionDispatcher(action);
    }
    return (
        <div style={{minWidth: "50%", height: "auto", marginBottom: "48px"}}>
            <ProductImageStyle>
                <div>
                    <img src={product.imageUrl} alt={"image of "+product.name}/>
                    
                    {
                        cartProducts.findIndex((p) => p.productId === product.id) === -1
                        ? 
                        (
                            
                            <button 
                            className="add-to-cart-btn"
                            onClick={() => addToCart()}
                            > 
                                <i className="fa fa-add">+</i> 
                            </button>        
                        ): (
                            
                            <button 
                            style={{backgroundColor: "red"}}
                            className="add-to-cart-btn"
                            onClick={() => removeFromCart()}
                            > 
                             <i className="fa fa-minus"></i>
                            </button>
                        )
                    }
                </div>
            </ProductImageStyle>
            <h3 
                title="click to view detail" 
                onClick={() => { navigate("/product/"+product.id) }}
            >
                <span>{product.name}</span>
            </h3>
            <p>
                <span>{formatCurrency(currency, product.price as string)}</span>
            </p>
        </div>
    )
}
export const ProductImageStyle = styled.div`
    div {
        position: relative;
    } 
    .add-to-cart-btn{
        display: none;
        position: absolute;
        right: 1%;
        bottom: 0;
        z-index: 2;
        background: black;
        border-radius: 50%;
    }
    div:hover .add-to-cart-btn{
        display: block;
    }
    img{
        width: 100%;
        height: auto;
    }
`;