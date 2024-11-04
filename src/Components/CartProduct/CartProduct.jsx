import React, { useEffect, useState } from "react";
import Style from "./CartProduct.module.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default function CartProduct({ product, cart,setCart }) {
  const [isIncreaseLoading, setIsIncreaseLoading] = useState(false);
  const [IsDecreaseLoading, setIsDecreaseLoading] = useState(false);
  const [productCount, setProductCount] = useState(product.count);

  async function removeProductFromCart(productId) {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/` + productId,
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    setCart(data);
    toast.success("product has been removed successfuly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  async function updateProductCound(productId, count) {
    if (count>product.count) {
      setIsIncreaseLoading(true);
      
    }else{
      setIsDecreaseLoading(true)
    }
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/` + productId,
      {
        count,
      },
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    setCart(data);
    setIsIncreaseLoading(false);
    setIsDecreaseLoading(false)
  }
useEffect(()=>{
    setProductCount(product.count);

}
,[cart])
  return (
    <>
      <div className="col-md-8 mx-auto">
        <div className=" border-success border-2 border my-3 rounded  p-2 d-flex">
          <div className=" col-md-4">
            <img
              src={product.product.imageCover}
              style={{ height: "200px", width: "200px" }}
              alt=""
            />
          </div>

          <div className="col-md-8  d-flex">
            <div className="col-md-8 ">
              <h3>{product.product.title}</h3>
              <p className="mx-5">price: {product.price}$</p>

              <div className="mt-5">
                <button className="btn btn-danger me-3">
                  <i className="fa fa-heart"></i>
                </button>
                <button
                  onClick={() => removeProductFromCart(product.product._id)}
                  className="fa fa-trash btn btn-primary"
                ></button>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="d-flex justify-content-center mt-5">
                <button
                  disabled={product.count == 1||IsDecreaseLoading}
                  onClick={() =>
                    updateProductCound(product.product._id, product.count - 1)
                  }
                  className="btn bg-body-secondary "
                >
                  {IsDecreaseLoading ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa fa-minus"></i>
                  )}
                </button>
                <input
                  min={0}
                  type="number"
                  value={productCount}
                  onBlur={() =>
                    product.count != productCount &&
                    updateProductCound(product.product._id, productCount)
                  }
                  onChange={(e) => setProductCount(e.target.value)}
                  className="w-25 rounded text-center"
                />
                <button
                  disabled={isIncreaseLoading}
                  onClick={() =>
                    updateProductCound(product.product._id, product.count + 1)
                  }
                  className="btn bg-body-secondary"
                >
                  {isIncreaseLoading ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa fa-plus"></i>
                  )}
                </button>
              </div>
              <p className="mt-4 text-center p-2 rounded bg-success">
                Total price: {product.price * product.count}$
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
