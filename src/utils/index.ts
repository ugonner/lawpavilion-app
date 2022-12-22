import { rate } from "../datasets/currencies";

export const formatCurrency = (currency: string, amount: string) => {
    if(currency === "NGN"){
        amount = (Number(amount) * rate).toString();
    }
    let amountArr: string[] = amount.split("");
    let commered = amountArr.reverse().map((a, index, arr) => {
        if((index + 1) % 3 === 0 && index !== arr.length - 1){
            return `,${a}`;
        }
        return a;
    }).reverse().join("");
    
    currency = currency === "USD" ? "$" : "N";
    return `${currency} ${commered}.00`
}