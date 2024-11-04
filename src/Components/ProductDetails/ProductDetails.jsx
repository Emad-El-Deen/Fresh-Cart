import React, {  useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingStars from "./../RatingStars/RatingStars";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import ProductDetailsSlider from "./../ProductDetailsSlider/ProductDetailsSlider";
import RelatedProductDetails from './../RelatedProductDetails/RelatedProductDetails';
import { cart } from "../../CartServices";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProduct, setRelatedProduct] = useState([])
  let { id } = useParams();
  async function getDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/` + id
    );
    setProductDetails(data.data);
    getRelatedProducts(data.data?.category._id)
    setIsLoading(false);
  }



  async function getRelatedProducts(categoryId) {
    setIsLoading(true);
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`,{params:{
      "category":categoryId,
    }})
  setRelatedProduct(data.data)
  setIsLoading(false);

  }

  useEffect(() => {
    getDetails();

  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="m-auto my-5 ">
          <div className="row">
            <div className="col-md-3">
              <div className="bg-secondary-subtle rounded">
                <ProductDetailsSlider images={productDetails?.images} />
              </div>
            </div>
            <div className="col-md-6   m-auto ">
              <h3 className="">{productDetails?.title}</h3>
              <hr className="my-1" />
              <div className="d-flex justify-content-between">
                <div className="mt-2 ">
                  <label className="text-secondary ">Rating:</label>
                  <RatingStars rating={productDetails?.ratingsAverage} />
                </div>

                <div className="mt-2">
                  <label className="text-secondary ">Rating:</label>
                  <h5>{productDetails?.price}$</h5>
                </div>
              </div>

              <div className="">
                <label className="text-secondary ">Description:</label>
                <h3 className="fs-5">{productDetails?.description}</h3>
              </div>

              <div className="d-flex justify-content-between">
                <div className="mt-2">
                  <label className="text-secondary ">Category:</label>
                  <h3 className="fs-5">{productDetails?.category.name}</h3>
                </div>

                <div className="mt-2">
                  <label className="text-secondary ">SubCategory:</label>
                  <h3 className="fs-5">
                    {productDetails?.subcategory[0].name}
                  </h3>
                </div>
              </div>

              <div className="mt-2">
                <label className="text-secondary">Brand:</label>
                <h3 className="fs-5">{productDetails?.brand.name}</h3>
              </div>
              <div className="my-3">
                <button className="me-2 btn btn-primary">Order Now</button>
                <button onClick={() => cart(productDetails._id)} className="btn btn-outline-success">
                  <i className="fa fa-cart-shopping "></i>
                </button>
              </div>

            </div>
            <RelatedProductDetails related={relatedProduct}/>
          </div>
        </div>
      )}
      
    </>
  );
}
