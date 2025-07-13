import React from 'react'
import FilterProductCard from './FilterProductCard'
import { Link } from 'react-router-dom'

const FilterProductsContainer = ({ productsList }) => {
  return (
    <div className='filter_products_container'>
      {
          productsList?.map((data, i) => (
            <Link to={`/products/${data?.id}`} key={i}>
               <FilterProductCard data={data}  />
            </Link>
           
          ))
      }
    </div>
  )
}

export default FilterProductsContainer
