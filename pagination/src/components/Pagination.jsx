import React, { useEffect, useState } from "react";
import Product from "./Product";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=500`);
    const data = await response.json();
    console.log(data);
    setProducts(data?.products);
  };

  const paginationLength = Math.ceil(products.length / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const handlePagination = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePrevByOffset = () => {
    setCurrentPage(currentPage - 4);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleNextByOffset = () => {
    setCurrentPage(currentPage + 4);
  };

  const handleChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <div className="container">
        <h2 className="title">Products</h2>
        <div className="wrapper">
          <div className="products-container">
            {products.slice(startIndex, endIndex).map((product) => {
              const {
                id,
                brand,
                category,
                description,
                images,
                price,
                rating,
                title,
              } = product;
              return (
                <Product
                  key={id}
                  brand={brand}
                  category={category}
                  description={description}
                  images={images[0]}
                  price={price}
                  rating={rating}
                  title={title}
                />
              );
            })}
          </div>

          {paginationLength > 0 && (
            <div className="actions">
              <div className="group">
                <p className="info">
                  You are on page{" "}
                  <span>
                    {currentPage + 1}/{paginationLength}
                  </span>
                </p>
                <select onChange={handleChange}>
                  {Array.from({ length: paginationLength }).map((_, i) => {
                    return (
                      <option key={i} value={i} selected={i == currentPage}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="pagination">
                <button
                  className="page prev"
                  onClick={handlePrevByOffset}
                  disabled={currentPage < 4}
                >
                  &laquo;
                </button>
                <button
                  className="page prev"
                  onClick={handlePrev}
                  disabled={currentPage <= 0}
                >
                  &lt;
                </button>
                {Array.from({ length: paginationLength }).map((_, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => handlePagination(i)}
                      className={i === currentPage ? "page current" : "page"}
                      disabled={i === currentPage}
                    >
                      {i + 1}
                    </button>
                  );
                })}
                <button
                  className="page next"
                  onClick={handleNext}
                  disabled={currentPage >= paginationLength - 1}
                >
                  &gt;
                </button>
                <button
                  className="page next"
                  onClick={handleNextByOffset}
                  disabled={currentPage >= paginationLength - 4}
                >
                  &raquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Pagination;