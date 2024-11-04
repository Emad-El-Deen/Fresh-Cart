import React, { useContext, useEffect, useState } from "react";
import Style from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
export default function Navbar() {
  const [counter, setCounter] = useState();
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("Token");
    setUserLogin(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark text-white-50  bg-success">
        <div className="container">
          <NavLink className="  navbar-brand " to="">
            FreshCart
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userLogin !== null ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link " aria-current="page" to="">
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="brands">
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="categories">
                      Categories
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userLogin === null ? (
                <>
                  <NavLink className="nav-link " to={"login"}>
                    Login
                  </NavLink>
                  <NavLink className="nav-link" to={"register"}>
                    Register
                  </NavLink>
                </>
              ) : (
                <div className=" d-flex me-5 justify-content-between ">
                <button className="btn nav-link" onClick={logout}>
                  Logout{" "}
                </button>
                <NavLink to={'cart'} className="btn mt-1  nav-link fa fa-cart-shopping" onClick={''}>

                </NavLink>
                </div>

              )}
              <li className="py-2 m-1 d-flex ">
                <i className="fab me-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
