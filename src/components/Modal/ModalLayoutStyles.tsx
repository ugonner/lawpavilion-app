import styled from "styled-components";
export const ModalLayoutStyles = styled.div`
display: flex;
flex-flow: column no-wrap;
background: rgba(0,0,0,1);
align-items: center;
justify-content: center;
position: absolute;
top: 0;
left: 0;
width: 100%;
z-index: 10;


.modal-content{
    width: 500px;
    background: fff;
    transition: width 4s;
    
}
.modal-body{
    justify-content: center;
}
.modal-toggler{
    float: right;
}
`;