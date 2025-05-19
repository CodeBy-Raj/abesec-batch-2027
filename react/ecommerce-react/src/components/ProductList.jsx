import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

const ProductList = () => {
  let [productList, setProductList] = useState([]);
  let [searchItem, setSearchItem] = useState("");
  let [allProducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://682755e76b7628c5290ff8b1.mockapi.io/api/v1/products/products"
    );
    const products = await response.json();
    setProductList(products);
    setAllProducts(products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleFilterButtonClick() {
    productList = productList.filter((product) => product.rating > 4);
    setProductList(productList);
  }

  let handleSearchItemBtn = () => {
    const searchFor = productList.filter((prod) =>
      prod.name.toLowerCase().includes(searchItem)
    );
    setProductList(searchFor);
    setSearchItem("");
  };

  let handleResetBtn = () => {
    setProductList(allProducts);
  };

  return (
    <section className="products">
      <h1>Trending Products</h1>
      <div className="container">
        <div className="searchItems">
          <input
            type="search"
            placeholder="Search By Product Title"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value.toLowerCase())}
          />
          <button className="search-btn button" onClick={handleSearchItemBtn}>
            Search
          </button>
          <button className="search-btn button" onClick={handleResetBtn}>
            Reset
          </button>
        </div>
        <div>
          <button onClick={handleFilterButtonClick} className="filter-button">
            Filter Top Rated Products
          </button>
        </div>
      </div>
      <div className="products-grid">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
