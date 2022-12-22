import { ReactNode } from "react";
import styled from "styled-components"
import { ModalLayoutStyles } from "./ModalLayoutStyles";
interface ModalProps {
    children: ReactNode;
    title?: string;
    footer?: string;
    onClose: () => void
}
export const ModalLayout = ({children, title, footer, onClose}: ModalProps) => {
    return (
        <ModalLayoutStyles>
            <div className="modal-content">
                <div className="modal-header">
                    <strong className="modal-title">{title ?? "Modal"}</strong>
                    <button
                    className="modal-toggler"
                    onClick={() => onClose()}>
                        <i className="fa fa-close"></i>
                    </button>

                </div>
                <div className="modal-bodyr">
                    {children}
                </div>
                <div className="modal-footer">
                    <h6>{footer ?? ""}</h6>
                </div>
            </div>
        </ModalLayoutStyles>
    )
}