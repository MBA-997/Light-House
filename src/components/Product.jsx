import React from "react";
import "./styling/Product.css";

function Product({ id, title, price, rating, image }) {
  const addToCart = () => {
    /* will send data via dispatch and reducer */
  };

  return (
    <div className="product">
      <div className="product__info">
        <div className="product__title">{title}</div>
        <p className="product__price">
          <strong>Rs.{price}</strong>
        </p>
      </div>
      <div className="product__rating">
        {Array(rating)
          .fill()
          .map((i) => {
            return <span>⭐</span>;
          })}
      </div>
      <img className="product__image" src={image} alt="product image" />
      <button className="product__addToCart" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
