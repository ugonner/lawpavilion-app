import React, { useContext, createContext,Dispatch, useReducer, ReactNode } from "react";
import { ICartProduct,  } from "../../interfaces/product";
import { IPopoverProps } from "../general";

export interface ICartFactors {
    currency: string;
    cartProducts: ICartProduct[];
    displayCartModal: boolean;
    generalModalState: IPopoverProps
    
}

export interface IAction {
    actionName: string;
    data: string | ICartProduct | boolean | IPopoverProps;
};

export const initialCartState: ICartFactors = { 
    currency: "USD",
    cartProducts: [],
    displayCartModal: false,
    generalModalState: {} as IPopoverProps
};

export const cartStateReducer = (state: ICartFactors, action: IAction ) => {
    const {actionName, data} = action;
    const productIndex = state.cartProducts.findIndex((p: ICartProduct) => p.productId === (data as ICartProduct).productId);
    let display = true; // display general popover modal
    let message = "Done"; // popover message

    switch(actionName){
        case "changeCurrency":
            state.currency = (data as string);
            state.generalModalState = {display, message: "Currency changed and prices evaluated"}
            return {...state};
        
            // toggle cartModal
        case "toggleCartModal":
            state.displayCartModal = data as boolean;
            return {...state};
        case "toggleGeneralModal":
            state.generalModalState.display = (data as IPopoverProps).display;
            state.generalModalState.message = "";
            return {...state};
            
            //handle cart     
        case "addToCart":
            state.cartProducts.push(data as ICartProduct);
            state.generalModalState = {display, message: "Added to cart"};
            return {...state};
    
        case "removeFromCart":
            state.cartProducts.splice(productIndex,1);
            state.generalModalState = {display, message: "Removed item from cart"};
            return {...state};
    
        case "setProductColors":
            state.cartProducts[productIndex].colors = (data as ICartProduct).colors;
            state.generalModalState = {display, message: "Item color selected as "+(data as ICartProduct).colors};
            return {...state};
        
        case "setProductSizes":
            state.cartProducts[productIndex].sizes = (data as ICartProduct).sizes;
            state.generalModalState = {display, message: "Item size selected as "+(data as ICartProduct).sizes};
            return {...state};
        
        case "incrementProductQuantity":
            state.cartProducts[productIndex].quantity++;
            return {...state};
        
        case "decrementProductQuantity":
            state.cartProducts[productIndex].quantity--;
            return {...state};
                                
        default:
            return {...state};;
    }
}
