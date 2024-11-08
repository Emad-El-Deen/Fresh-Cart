import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import Guard from "./Components/Guard/Guard";
import GuardAuth from "./Components/GuardAuth/GuardAuth";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import Cart from "./Components/Cart/Cart";
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";
import { Offline } from "react-detect-offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Guard>
              {" "}
              <Home />
            </Guard>
          ),
        },
        {
          path: "brands",
          element: (
            <Guard>
              {" "}
              <Brands />{" "}
            </Guard>
          ),
        },
        {
          path: "categories",
          element: (
            <Guard>
              {" "}
              <Categories />
            </Guard>
          ),
        },
        {
          path: "shippingAddress/:cartId",
          element: (
            <Guard>
              {" "}
              <ShippingAddress />
            </Guard>
          ),
        },
        {
          path: "productDetails/:id/",
          element: (
            <Guard>
              {" "}
              <ProductDetails />
            </Guard>
          ),
        },
        {
          path: "cart",
          element: (
            <Guard>
              {" "}
              <Cart />
            </Guard>
          ),
        },
        {
          path: "login",
          element: (
            <GuardAuth>
              <Login />
            </GuardAuth>
          ),
        },
        {
          path: "register",
          element: (
            <GuardAuth>
              <Register />
            </GuardAuth>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  const queryClient =new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
          <Offline>
            <div className="position-absolute p-2 rounded bg-warning">
              Only shown offline (surprise!)
            </div>
          </Offline>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}
