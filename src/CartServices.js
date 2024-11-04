import axios from "axios";
import { Bounce, toast } from "react-toastify";

export async function cart(productId,userLogin) {
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      productId:productId
    },{
      headers:{
        token:localStorage.getItem('Token')
      },
    }
  )
  console.log(data)
  toast.success(data.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
    ,
    });
  }