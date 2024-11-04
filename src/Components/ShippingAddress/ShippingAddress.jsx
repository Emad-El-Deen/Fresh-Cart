import Style from "./ShippingAddress.module.css";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
export default function ShippingAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const { cartId } = useParams();
  async function onSubmit() {
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/` +
          cartId,
        { shippingAddress: formik.values },
        { headers: { token: localStorage.getItem("Token") } },
        { params: { url: "http://localhost:3000" } }
      )
      .then((data) => {
        location.href = data.data.session.url;
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }
  let validationSchema = Yup.object().shape({
    city: Yup.string().required("city is Required"),
    phone: Yup.string().required("phone is Required"),
    details: Yup.string().required("details is Required"),
  });

  let formik = useFormik({
    initialValues: {
      city: "Dokki",
      phone: "01012598631",
      details: "6 tahrer Street",
    },
    validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <div className="py-3 col-md-6 mx-auto">
        <h2 className="text-center fw-bold mb-3 text-success">
          Add your Shipping Address{" "}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              name="city"
              type="text"
              className={`  form-control border-0  border-bottom   ${Style.none}`}
              placeholder=""
            />
            <label htmlFor="city">city : </label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              name="details"
              type="text"
              className={`  form-control border-0  border-bottom   ${Style.none}`}
              placeholder=""
            />
            <label htmlFor="details">details : </label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              name="phone"
              type="text"
              className={`  form-control border-0  border-bottom   ${Style.none}`}
              placeholder=""
            />
            <label htmlFor="phone">phone : </label>
          </div>

          <div className="d-flex align-items-center ">
            <button type="submit" className="btn my-4 btn-success">
              {isLoading ? (
                <i className="fas fa-spinner fa-spin px-2"></i>
              ) : (
                "Check Out"
              )}
            </button>
          </div>
        </form>
      </div>

    </>
  );
}
