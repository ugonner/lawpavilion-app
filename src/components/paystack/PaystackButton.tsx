import { usePaystackPayment } from "react-paystack";
import styled from "styled-components";

export interface IPaystackConfig {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
}
interface PaystackButtonProps {
  config: IPaystackConfig;
  onSuccess: () => void;
  onClose: () => void;
}

export const CustomPaystackButton = ({
  config,
  onClose,
  onSuccess,
}: PaystackButtonProps) => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <PaystackButtonStyles
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Pay {config.amount} With Paystack
      </PaystackButtonStyles>
    </div>
  );
};

const PaystackButtonStyles = styled.button`
  background: blue;
  width: 100%;
  border: 0;
`;
