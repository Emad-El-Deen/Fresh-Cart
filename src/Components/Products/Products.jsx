import React, {  useEffect, useState } from "react";
import RatingStars from "../RatingStars/RatingStars";
import { splitName } from "../../Helpers/Helpers";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import { cart } from "../../CartServices";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getProducts() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="row g-3 my-3">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6  d-flex justify-content-center  ">
                <div className="card" style={{ width: "17rem" }}>
                  <NavLink to={"/productDetails/" + product._id}>
                    <img
                      src={product.imageCover}
                      className="card-img-top"
                      alt="product image"
                    />
                  </NavLink>
                  <div className="px-3">
                    <h5 className="">{splitName(product.title)}</h5>
                  </div>

                  <div className="px-3 d-flex ">
                    <RatingStars rating={product.ratingsAverage} />
                  </div>

                  <div className="d-flex justify-content-between my-3 ">
                    <h5 className="px-2  m-2">{product.price}$</h5>
                    <button
                      onClick={() => cart(product._id)}
                      className="btn btn-primary m-2 "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
