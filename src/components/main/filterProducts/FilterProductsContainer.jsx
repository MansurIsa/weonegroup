import React from "react";
import FilterProductCard from "./FilterProductCard";

const FilterProductsContainer = ({ productsList }) => {
  console.log(productsList);
  
  return (
    <div className="filter_products_container">
      {productsList?.map((data) => (
        <FilterProductCard key={data.id} data={data} />
      ))}
    </div>
  );
};

export default React.memo(FilterProductsContainer);
