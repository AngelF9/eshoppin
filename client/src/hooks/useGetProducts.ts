import { useState, useEffect, useContext } from "react";
// please recall the axios needs async and await notation
// note: cant make useEffect become an async function...
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interface";
import { IShopContext, ShopContext } from "../context/shop-context";

export const useGetProducts = () => {
  // create a state products (holds all products)
  // populated depending on an API request that
  // is being made to our backend
  const [products, setProducts] = useState<IProduct[]>([]);
  // middleware
  const { headers } = useGetToken();
  // fetching isAuthenticated
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  const fetchProducts = async () => {
    try {
      // using link to our endpoint
      const fetchedProducts = await axios.get("http://localhost:3001/product", {
        headers,
      });
      // to save this
      setProducts(fetchedProducts.data.products);
    } catch (error) {
      alert("ERROR: Something went wrong.");
    }
  };
  // to make API reqeust we need useEffect which
  // will call and request using axios
  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  return { products };
};
