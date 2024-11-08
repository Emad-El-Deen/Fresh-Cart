import React, { useEffect, useState } from "react";
import Style from "./RelatedProductDetails.module.css";
import Slider from "react-slick";
import { splitName } from "../../Helpers/Helpers";
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { NavLink } from "react-router-dom";
import { cart } from "../../CartServices";

export default function RelatedProductDetails({ related }) {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="mt-5">
        <Slider {...settings}>
          {related.map((category) => {
            return (
              <div
                className="p-1 mb-5 mx-auto "
                key={category}
              >
                <div className="rounded shadow-sm">
                  <div
                    className=" d-flex align-items-end justify-content-end "
                    style={{
                      backgroundImage: `url(${category.imageCover})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px", 
                    borderRadius:"20px"
                    }}
                  >
                    <button onClick={() => cart(category._id)} className="btn fa fa-cart-arrow-down rounded btn-primary   mx-2"></button>
                  </div>
                  <NavLink to={`/productDetails/`+category._id}>
                  <div className="p-2">
                    <h6 className="text-secondary "> {splitName(category.title)}</h6>
                    <span className="text-secondary mt-1 ">{category.price}$</span>
                  </div>
                  
                  </NavLink>

                </div>
              </div>

            );
          })}
        </Slider>
      </div>
    </>
  );
}
