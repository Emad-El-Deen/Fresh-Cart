import React, { useEffect, useState } from "react";
import Style from "./ProductDetailsSlider.module.css";
import Slider from "react-slick";
export default function ProductDetailsSlider({ images }) {
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Slider {...settings}>
        {images?.map((image) => {
          return <img key={image} src={image} className="rounded w-100" alt="" />;
        })}
      </Slider>
    </>
  );
}
