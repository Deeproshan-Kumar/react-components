import React from "react";

const Product = ({
  id,
  brand,
  category,
  description,
  images,
  price,
  rating,
  title,
}) => {
  return (
    <article id={`product-${id}`} className="product">
      <div className="card">
        <div className="card-header">
          <img src={images} alt={brand} />
        </div>
        <div className="card-body">
          <h4 className="name">
            {title}
            <span>⭐{rating.toFixed(1)}</span>
          </h4>
          <p className="category">{category}</p>
          <big className="price">${price}/-</big>
          <p className="excerpt">
          <small>{description}</small>
          </p>
        </div>
      </div>
    </article>
  );
};

export default Product;