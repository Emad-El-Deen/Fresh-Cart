import React, { useEffect, useState } from "react";
import Style from "./Footer.module.css";
import { NavLink } from "react-router-dom";
export default function Footer() {
  const [counter, setCounter] = useState();

  return (
    <>
      <div className= " w-100  ">
        <footer className="   bg-success text-center text-white">
          <div className="container p-4 pb-0 ">
            <section className="mb-4">
              <NavLink
                className="btn btn-outline-light btn-floating m-1"
                to="#!"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </NavLink>

              <NavLink
                className="btn btn-outline-light btn-floating m-1"
                to="#!"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </NavLink>

              <NavLink
                className="btn btn-outline-light btn-floating m-1"
                to="#!"
                role="button"
              >
                <i className="fab fa-google"></i>
              </NavLink>

              <NavLink
                className="btn btn-outline-light btn-floating m-1"
                to="#!"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </NavLink>

              <NavLink
                className="btn btn-outline-light btn-floating m-1"
                to="#!"
                role="button"
              >
                <i className="fab fa-linkedin-in"></i>
              </NavLink>

              <NavLink
                className="btn btn-outline-light btn-floating m-1"
                to="#!"
                role="button"
              >
                <i className="fab fa-github"></i>
              </NavLink>
            </section>
          </div>

          <div
            className="text-center p-3"
          >
            © 2020 Copyright:
            <NavLink className="text-white" to="">
              FreshCart.com
            </NavLink>
          </div>
        </footer>
      </div>
    </>
  );
}
