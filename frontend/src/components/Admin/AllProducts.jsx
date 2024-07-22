import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AllProducts = () => {
    
    const allProducts=useSelector(state=>state.products)
    console.log(allProducts)
  return (
    <div>AllProducts</div>
  )
}

export default AllProducts