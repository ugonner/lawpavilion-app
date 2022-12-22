import { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from 'styled-components';
import { ModalLayout } from "../components/Modal/ModalLayout";
import { IAction } from "../contexts/cart";
import { categories } from "../datasets/categories";
import { currencies } from "../datasets/currencies";
import { Cart } from "../pages/cart/Cart";
import { useAppContext } from "../contexts";
import { IPopoverProps } from "../contexts/general";


export const Layout = () => {
    const {cartState, cartActionDispatcher, generalState, generalActionDispatcher} = useAppContext();
    const toggleCartModal = (display: boolean) => {
        cartActionDispatcher({actionName: "toggleCartModal", data: display})
    }
    const toggleGeneralModal = (display: boolean, message: string) => {
        const data: IPopoverProps = {display, message} 
        generalActionDispatcher({actionName: "toggleGeneralModal", data})
        cartActionDispatcher({actionName: "toggleGeneralModal", data})
    }
    const changeCurrency = (currency: string) => {
        
        const action: IAction = {
            actionName: "changeCurrency",
            data: currency
        }
        cartActionDispatcher(action);
    }
    return (
        
        <>
        <LayoutNav>
            <div>
                <Link to={"/"}>Home</Link>
            </div>
            {
                categories.map((c) => (
                    
                    <div>
                        <Link to={`/category/${c.id}`}>{c.name}</Link>
                    </div>
                ))
            }

            <div className="nav-toggler">
                <button 
                className="cart-toggler"
                onClick={() => {
                    cartState.cartProducts.length > 0 ? toggleCartModal(true) : alert("nothing in cart yet") }}
                >
                    <i className="fa fa-user"></i> {cartState.cartProducts.length > 0 ? cartState.cartProducts.map((p) => p.quantity).reduce((sum, q) => sum + q) : 0}
                </button>
                
            </div>

            <div className="nav-toggler">
                {
                    currencies.map((curr) => (
                        <button 
                        className="currency-toggler"
                        onClick={() => {changeCurrency(curr)}}
                        >
                            {curr}
                        </button>
                    ))
                }
                
            </div>
        </LayoutNav>
        <div><Outlet />  </div>

        
        {cartState.displayCartModal 
        && (
        <ModalLayout
        title="Cart"
        onClose={() => {toggleCartModal(false)}} >
            <Cart />
        </ModalLayout>
        )}

        {(generalState.displayGeneralModal || cartState.generalModalState.display) 
        && (
        <ModalLayout
        title=""
        onClose={() => {toggleGeneralModal(false, generalState.displayMessage)}} >
            <div>
                <h3>{cartState.generalModalState.message ?? generalState.displayMessage}</h3>
                <button
                className="popover-ok-btn"
                style={{backgroundColor: "blue", border: 0, width: "100%"}}
                onClick={() => {toggleGeneralModal(false, generalState.displayMessage)}} 
                >OK</button>
        
            </div>
        </ModalLayout>
        )}
       </> 
    )
}

export const LayoutNav = styled.div`
    display: flex;
    flex-flow: row wrap;
    jsustify-content: center;
    div {
        padding: 2rem;
        
        a {
            font-size: 1.5em;
            font-weight: bold;
            text-decoration: none;
        }
    }
    .cart-toggler{
        float: right !important;
    }
    button{
        border: 0;
    }
    
`;