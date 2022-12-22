import { Dispatch, createContext, ReactNode, useContext, useReducer } from "react";
import { cartStateReducer, IAction, initialCartState } from "./cart";
import { generalStateReducer, IGeneralAction, initialGeneralState } from "./general";

const initialContext = {
    cartState: initialCartState,
    cartActionDispatcher: {} as Dispatch<IAction>,
    generalState: initialGeneralState,
    generalActionDispatcher: {} as Dispatch<IGeneralAction>
};

const AppContext = createContext(initialContext);

export const useAppContext = () => useContext(AppContext);

interface ProviderProps {children: ReactNode};

export const AppContextProvider = ({children}: ProviderProps) => {
    const [cartContextStates, dispatchCartActions] = useReducer(cartStateReducer, initialCartState);
    const [generalContextStates, dispatchGeneralActions] = useReducer(generalStateReducer, initialGeneralState);
    const AppStateActionDispatchers = {
        cartState: cartContextStates,
        cartActionDispatcher: dispatchCartActions,
        generalState: generalContextStates,
        generalActionDispatcher: dispatchGeneralActions
    
    };
    const {Provider} = AppContext;
    
    return (
        <Provider value={AppStateActionDispatchers}>{children}</Provider>
    )
}