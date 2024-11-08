import React, { useEffect, useState } from "react";
import Style from "./Categories.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
export default function Categories() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getBrands() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    
    const uniqueBrands = data.data.filter((item, index, self) =>
      index === self.findIndex((i) => i.category._id === item.category._id)
    );
    
    setProducts(uniqueBrands);
    setIsLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) :
      <div className="row vh-100">
        {products.map((product) => (
          <div className="col-md-4 col-sm-12" key={product.category._id}>
            <div className="mt-5 mx-2">
  
            <h5>{product.category.name}</h5>

            </div>
          </div>
        ))}
      </div>
}
    </>
  );
}
