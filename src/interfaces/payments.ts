export interface IPaymentData {
    email: string;
    address: string;
    phoneNumber: string;
}
export interface IPaymentState {
    showPopover: boolean;
    message: string;
}