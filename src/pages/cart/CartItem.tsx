import styled from "styled-components"
import { useAppContext } from "../../contexts"; 
import { ICartProduct, IProduct } from "../../interfaces/product"
import { products } from "../../datasets/product";
import { formatCurrency } from "../../utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CartItemProps{
    cartProduct: ICartProduct;
}
export const CartItem = ({cartProduct}: CartItemProps) => {
    const {cartState, cartActionDispatcher} = useAppContext();
    const itemProductData = products.find((p: IProduct) => p.id === cartProduct.productId);
    useEffect(() => {
        cartProduct = cartState.cartProducts.find((p) => p.productId === cartProduct.productId) as ICartProduct
    })
    const navigate = useNavigate();
    return (
        <>
            <CartItemStyles>
                <div className="cart-item">
                   <img src={itemProductData?.imageUrl} className="cart-item-image" /> 
                    <h2>
                        <button
                        onClick={() => 
                            { 
                                cartActionDispatcher({actionName: "toggleCartModal", data: false});
                                navigate("/product/"+cartProduct.productId) 
                            }}
                        style={{border: 0, backgroundColor: "transparent", fontSize: "1em"}}
                        >
                            {itemProductData?.name}
                        </button>
                        <span className="cart-item-quantity-btns">
                            <button
                            className="cart-item-quantity"
                            onClick={() => {
                                const data = {...cartProduct};
                                cartActionDispatcher({actionName: "decrementProductQuantity", data})
                            }}>-</button>

                            {/* summation of quantities */}
                            { cartState.cartProducts.find((p) => p.productId === cartProduct.productId)?.quantity }
                            
                            <button
                            className="cart-item-quantity"
                            onClick={() => {
                                const data = {...cartProduct};
                                cartActionDispatcher({actionName: "incrementProductQuantity", data})
                            }}>+</button>
                        </span>
                    </h2>
                    <h2>{itemProductData?.productCategory}</h2>
                    <h3>{formatCurrency(cartState.currency, itemProductData?.price as string)}</h3>
                    
                    <p>COLORS: <small>click to select</small></p>
                    <p>
                    {
                        itemProductData?.colors.map((color: string, index: number, arr: string[]) => 
                        (
                            <button 
                            style={{backgroundColor: color}}
                            onClick={() => {
                                const data: ICartProduct = {...cartProduct, colors: color};
                                cartActionDispatcher({actionName: "setProductColors", data})
                            }}
                            className={cartProduct.colors === color ? "cart-item-set-color": "cart-item-color"}
                            >
                            .
                            </button>
                        ))
                    }
                    </p>
                    <p>SIZES: <small>click to select</small></p>
                    {
                        itemProductData?.sizes.map((size: string, index: number, arr: string[]) => 
                        (
                            <button 
                            onClick={() => {
                                const data: ICartProduct = {...cartProduct, sizes: size};
                                cartActionDispatcher({actionName: "setProductSizes", data})
                            }}
                            className={cartProduct.sizes === size ? "cart-item-set-size": "cart-item-size"}
                            >
                            .
                            </button>
                        ))
                    }
                    <p>

                    </p>
                </div>
            </CartItemStyles>
        </>
    )
}

export const CartItemStyles = styled.div`
    .cart-item-quantity-btns{
        float: right;
    }
    .cart-item-quantity{
        border-radius: 50%;
        margin: 1em;
    }
    .cart-item-color{
        margin: 0.5em;
        width: 3em;
        height: 3em;
        background: transparent;
    }
    .cart-item-size{
        margin: 0.5em;
        width: 3em;
        height: 3em;
        background: transparent;
    }
    

    .cart-item-set-size, .cart-item-set-color{
        margin: 0.5em;
        width: 3.5em;
        height: 3em;
        background: black;
    }
    .
`;