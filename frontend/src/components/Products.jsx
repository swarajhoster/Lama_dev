import { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, fliters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : `http://localhost:5000/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(fliters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, fliters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat ? (
        filteredProducts.length === 0 ? (
          <h1 style={{ margin: "auto" }}>No Products Found</h1>
        ) : (
          filteredProducts.map((item) => <Product item={item} key={item.img} />)
        )
      ) : products.length === 0 ? (
        <h1 style={{ margin: "auto" }}>No Products Found</h1>
      ) : (
        products
          .slice(0, 8)
          .map((item) => <Product item={item} key={item.img} />)
      )}
    </Container>
  );
};

export default Products;
