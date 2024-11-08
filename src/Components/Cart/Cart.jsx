import React, { useEffect, useState } from "react";
import Style from "./Cart.module.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CartProduct from "../CartProduct/CartProduct";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Cart() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserCart();
  }, []);
  async function getUserCart() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    ).finally(()=>{setIsLoading(false);})
    setCart(data);
  }

  async function clearCart() {
    let {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,  {
      headers: {
        token: localStorage.getItem("Token"),
      },
    })
    setCart(null)
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen/>
  }
  return (
    <>
        <Helmet>
      <title>Cart</title>
    </Helmet>
      {cart ?  (
        <div className="row position-relative">
          <h1 className="my-3 text-center fw-bold">Cart Item ({cart?.numOfCartItems})</h1>
          {cart?.data.products.map((product, index) => {
            return (
              <CartProduct
                key={index}
                product={product}
                cart={cart}
                setCart={setCart}
              />
            );
          })}

          <div
            className="col-lg-4 col-md-6 col-sm-12 top "
            style={{position:"sticky", left:'68%'}}
          >
            <div className=" border-success border-2 border my-3 rounded p-4">
              <div className="mb-1 d-flex justify-content-between">
                <p>Subtotal</p>
                <p>{cart?.data.totalCartPrice}$</p>
              </div>
              <div className="mb-1 d-flex justify-content-between">
                <p>shipping</p>
                <p>0$</p>
              </div>
              <hr className="my-2" />
              <div className="mb-1 d-flex justify-content-between">
                <p className="fw-bold">Total</p>
                <div className="">
                  <p className="fw-bold">{cart?.data.totalCartPrice} USD</p>
                </div>
              </div>

              <NavLink
                to={"/ShippingAddress/" + cart?.data._id}
                className="btn btn-primary w-100"
              >
                Check out
              </NavLink>
            </div>
          </div>
          <button onClick={()=>clearCart()} className="my-3 mx-auto position-sticky  btn btn-danger" style={{width:'%'}}>clear cart</button>

        </div>
      ):<h1  className="text-center fs-3 fw-bold">no products in your cart </h1>}


    </>
  );
}
