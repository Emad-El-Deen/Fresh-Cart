import React, { useEffect, useState } from 'react'
import Style from './RatingStars.module.css'
export default function RatingStars({rating}) {
    const [counter, setCounter] = useState() 


  return (
    <>
    <div className='d-flex'>

      <p className="">
                      {[1, 2, 3, 4, 5].map((rate,index) => {
                        return <i key={index} className ={rating>=rate ?"fa fa-star text-warning":"fa fa-star text-secondary"}></i>;
                      })}
                    </p>
                    <p className=" bg-info-subtle rounded mx-2 px-2">
                    {rating}
                  </p>

                    </div>


    </>
  )
}
