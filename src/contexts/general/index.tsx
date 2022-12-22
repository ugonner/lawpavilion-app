export interface IGeneralFactors {
    displayGeneralModal: boolean;
    displayMessage: string;
}
export interface IPopoverProps{
    display: boolean;
    message: string;
}
export interface IGeneralAction {
    actionName: string;
    data: IPopoverProps;
};

export const initialGeneralState: IGeneralFactors = { 
    displayGeneralModal: false,
    displayMessage: ""
};

export const generalStateReducer = (state: IGeneralFactors , action: IGeneralAction ) => {
    const {actionName, data} = action;
    
    switch(actionName){
        case "toggleGeneralModal":
            state.displayGeneralModal = (data.display);
            state.displayMessage = (data.message);
            return {...state};
        default:
            return state;
    }
}
