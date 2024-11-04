import React, { useContext, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let navigate = useNavigate();
  const [appiError, setAppiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { userLogin, setUserLogin } = useContext(UserContext);

  async function handleRegister(formValue) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValue)
      .then((response) => {
        if (response?.data?.message === "success") {
          localStorage.setItem("Token", response?.data.token);
          setUserLogin(response.data.token);
          navigate("/login");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setAppiError(error.response.data.message);
        setIsLoading(false);
      });
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name Min Length 3")
      .max(10, " Name Max length is 10")
      .required("Name is Required "),
    email: Yup.string()
      .email("Email is Invalid")
      .required("Email is Required "),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone must be valid Egyption number")
      .required("Phone is Required "),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,20}$/, "Password must start with uppercase ")
      .required("Password is Required "),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "repassword must same Password")
      .required("rePassword is Required "),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="py-3 col-md-6 mx-auto">
        <h2 className="text-center fw-bold mb-3 text-success">Register Now </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              type="name"
              className={`  form-control border-0  border-bottom   ${Style.none}`}
              placeholder="Name"
            />
            <label htmlFor="name">Name : </label>
          </div>

          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.name}
            </div>
          ) : null}

          <div className="form-floating mb-3">
            <input
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              type="email"
              className={`  form-control border-0  border-bottom   ${Style.none}`}
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email address : </label>
          </div>

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.email}
            </div>
          ) : null}

          <div className="form-floating mb-3">
            <input
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              name="phone"
              type="tel"
              className={`  form-control border-0  border-bottom   ${Style.none}`}
              placeholder="phone"
            />
            <label htmlFor="phone">Phone Number :</label>
          </div>

          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.phone}
            </div>
          ) : null}

          <div className="form-floating mb-3">
            <input
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              type="password"
              className={`  form-control border-0  border-bottom   ${Style.none}`}
              placeholder="password"
            />
            <label htmlFor="password">Password :</label>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : null}

          <div className="form-floating mb-3">
            <input
              id="rePassword"
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              name="rePassword"
              onChange={formik.handleChange}
              type="password"
              className={`  form-control border-0  border-bottom   ${Style.none}`}
              placeholder="name@example.com"
            />
            <label htmlFor="rePassword">RePassword :</label>
          </div>

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.rePassword}
            </div>
          ) : null}

          {appiError ? (
            <div className="text-center alert alert-danger" role="alert">
              {appiError}
            </div>
          ) : null}

          <div className="d-flex align-items-center ">
            <button type="submit" className="btn my-4 btn-success">
              {isLoading ? (
                <i className="fas fa-spinner fa-spin px-2"></i>
              ) : (
                "Sumbit"
              )}
            </button>
            <p className=" m-1 ps-4">
              Already have Acount?{" "}
              <span className="fw-bold">
                <NavLink className={`text-dark`} to={"/login"}>
                  Login Now
                </NavLink>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
