import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { userLogin, setUserLogin } = useContext(UserContext);


  async function handleLogin(formValue) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValue)
      .then((response) => {
        if (response?.data?.message==="success") {
          localStorage.setItem('Token',response.data.token)
          setUserLogin(response.data.token)
          navigate("/"); 
        }
          setIsLoading(false);
      })
      .catch((error) => {
        setApiError(error.response.data.message);
        setIsLoading(false);
      });
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is Invalid").required("Email is Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,20}$/, "Password must start with uppercase ")
      .required("Password is Required "),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className="py-3 col-md-6 mx-auto">
        <h2 className="text-center fw-bold mb-3 text-success">Login Now </h2>
        <form onSubmit={formik.handleSubmit}>
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

          {apiError ? (
            <div className="text-center alert alert-danger" role="alert">
              {apiError}
            </div>
          ) : null}

          <div className="d-flex align-items-center ">
            <button type="submit" className="btn my-4 btn-success">
              {isLoading ? (
                <i className="fas fa-spinner fa-spin px-2"></i>
              ) : (
                "Login"
              )}
            </button>
            <p className=" m-1 ps-4">
              Don't have Acount?{" "}
              <span className="fw-bold">
                <NavLink className={`text-dark`} to={"/register"}>
                  Register Now
                </NavLink>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
