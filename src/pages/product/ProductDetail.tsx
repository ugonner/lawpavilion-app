import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { products } from "../../datasets/product";

export const ProductDetail = () => {
    const {productId} = useParams();
    const product = products.find((p) => p.id === Number(productId));
    const productFiles = product ? product.productImages: [];
    productFiles.unshift(product?.imageUrl as string)
    const [largeImageUrl, setLargeImageUrl] = useState(product?.imageUrl) 
    return (
        <>
            <h1>{product?.name}</h1>
            <h6> click on any image to zoom </h6>
            <ProductDetailStyles>
                <div className="product-files">
                    {
                        productFiles.map((image) => (
                            <>
                            <img src={image} onClick={() => { setLargeImageUrl(image) }} />
                            
                            </>
                            
                            ))
                    }
                </div>
                <div className="product-image">
                    <img src={largeImageUrl} />
                </div>
            </ProductDetailStyles>
        </>
    )
}

export const ProductDetailStyles = styled.div`
    display: flex;
    flex-flow: row wrap;
    img{
        min-width: 100%;
        height: auto;
    }
    .product-files{
        max-width: 20%;
        margin-right: 10px;
    }
    .product-image{
        min-width: 70%;
    }
`;