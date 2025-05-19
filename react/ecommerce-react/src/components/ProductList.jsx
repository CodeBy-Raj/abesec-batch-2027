import ProductCard from './ProductCard';
// import products from '../data/products';
import { useEffect, useState } from 'react';

const ProductList = () => {
  let [productList, setProductList] = useState([]);
let [searchItm,setSearchItm] = useState("");

  const fetchData = async () => {
    const response = await fetch(
      'https://682755e76b7628c5290ff8b1.mockapi.io/api/v1/products/products'
    );
    const products = await response.json();
    console.log(products);
    setProductList(products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleFilterButtonClick() {
    productList = productList.filter((product) => product.rating > 4);
    console.log(productList);
    
    setProductList(productList);
  }

  let handleSearchItm =()=>{
     const searchFor= productList.filter((prod)=> prod.name.toLowerCase().includes(searchItm))
     console.log(searchFor);

     setProductList(searchFor);
     setSearchItm("");
    
  }

  return (
    <section className='products'>
      <h1>Trending Products</h1>

      <div className="container">

      <div className='searchItems'>
        <input 
        type='search' 
        placeholder='Search By Product Title' 
        value={searchItm}
        onChange={e => setSearchItm(e.target.value.toLowerCase())}

        />
        <button className='search-btn button' onClick={handleSearchItm}>Search</button>
      </div>
      <div>

      <button onClick={handleFilterButtonClick} className='filter-button'>
        Filter Top Rated Products
      </button>
      </div>
      </div>
      <div className='products-grid'>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
