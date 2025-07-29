import React from 'react'
import FilterProductCard from './FilterProductCard'

const FilterProductsContainer = ({ productsList }) => {
  return (
    <div className='filter_products_container'>
      {
        productsList?.map((data, i) => (
          <FilterProductCard key={i} data={data} />
        ))
      }
    </div>
  )
}

export default FilterProductsContainer
