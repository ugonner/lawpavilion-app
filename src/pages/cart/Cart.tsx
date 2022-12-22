import { ChangeEvent, useState } from "react";
import PaystackButton from "react-paystack/dist/paystack-button";
import styled from "styled-components";
import { ModalLayout } from "../../components/Modal/ModalLayout";
import {
  CustomPaystackButton,
  IPaystackConfig,
} from "../../components/paystack/PaystackButton";
import { useAppContext } from "../../contexts";
import { PK_KEY, taxRate } from "../../datasets/payments";
import { IPaymentData, IPaymentState } from "../../interfaces/payments";
import { ICartProduct } from "../../interfaces/product";
import { formatCurrency } from "../../utils";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const {
    cartState: { currency, cartProducts },
    cartActionDispatcher,
  } = useAppContext();
  const totalCost = cartProducts
    .map((p) => Number(p.price) * p.quantity)
    .reduce((sum, q) => sum + q);
  const [paystackData, setPaystackData] = useState({} as IPaymentData);
  const [paymentState, setPaymentState] = useState({} as IPaymentState);
  const config: IPaystackConfig = {
    email: paystackData.email,
    amount: taxRate * totalCost * 100,
    publicKey: PK_KEY,
    reference: (Math.random() * 1000000).toString(),
  };
  const paymentSuccessful = () => {
    setPaymentState({ showPopover: true, message: "payment successfull" });
  };

  const paymentCancelled = () => {
    setPaymentState({ showPopover: true, message: "payment cancelled" });
  };
  const handleChange = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    setPaystackData({ ...paystackData, [name]: value });
  };
  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <>
      {cartProducts.map((product: ICartProduct) => (
        <>
          <CartItem cartProduct={product} /> <br /> <br />
        </>
      ))}
      <CartStyles>
        {/* summation of quantities */}
        <p>
          Total Items:{" "}
          <span className="cart-figures">
            {cartProducts.map((p) => p.quantity).reduce((sum, q) => sum + q)}
          </span>{" "}
        </p>
        <p>
          Sum Cost{" "}
          <span className="cart-figures">
            {formatCurrency(currency, totalCost.toString())}
          </span>{" "}
        </p>
        <p>
          Tax Rate {taxRate}%{" "}
          <span className="cart-figures">
            {formatCurrency(currency, ((taxRate / 100) * totalCost).toString())}
          </span>{" "}
        </p>
        <p>
          Total @ {taxRate}%{" "}
          <span className="cart-figures">
            {formatCurrency(
              currency,
              (totalCost - (taxRate / 100) * totalCost).toString()
            )}
          </span>{" "}
        </p>
        <p>
          <button
            onClick={() => {
              setShowOrderForm(true);
            }}
            className="cart-order-btn"
          >
            Order{" "}
          </button>{" "}
        </p>
      </CartStyles>

      {showOrderForm && (
        <ModalLayout onClose={() => setShowOrderForm(false)} title="">
          <form>
            <h3>
                Please fill out all fields to Pay
            </h3>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                placeholder="bona@gmail.com"
                aria-label="enter your email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <textarea
                name="address"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                }}
                placeholder="delivery address"
                aria-label="enter delivery address"
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phoneNumber"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                placeholder="07034667861"
                aria-label="enter your phone"
                className="form-control"
              />
            </div>

            </form>
            <CustomPaystackButton
              config={config}
              onClose={() => paymentCancelled()}
              onSuccess={() => paymentSuccessful()}
            />
        </ModalLayout>
      )}

      {paymentState.showPopover && (
        <ModalLayout onClose={() => setPaymentState({} as any)} title="">
          <div>
            <h1>{paymentState.message}</h1>
          </div>
        </ModalLayout>
      )}
    </>
  );
};

export const CartStyles = styled.div`
  .cart-order-btn {
    width: 100%;
    border: 0;
    background: blue;
  }
  .cart-figures {
    float: right;
  }
`;
