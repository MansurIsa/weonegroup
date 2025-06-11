import React from 'react'
import FilterProductCard from './FilterProductCard'

const FilterProductsContainer = () => {
  return (
    <div className='filter_products_container'>
        <FilterProductCard/>
        <FilterProductCard/>
        <FilterProductCard/>
        <FilterProductCard/>
    </div>
  )
}

export default FilterProductsContainer