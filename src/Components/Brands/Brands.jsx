import React, { useEffect, useState } from "react";
import Style from "./Brands.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Brands() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getBrands() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    
    const uniqueBrands = data.data.filter((item, index, self) =>
      index === self.findIndex((i) => i.brand._id === item.brand._id)
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
        <title>Brands</title>
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) :
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.brand._id}>
            <div className=" m-2">
              <img
                src={product?.brand.image}
                className="card-img-top"
                alt="Brand image"
              />
            </div>
          </div>
        ))}
      </div>

}
    </>
  );
}
