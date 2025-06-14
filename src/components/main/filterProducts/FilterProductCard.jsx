import React from 'react'
import Img from "../../../assets/images/pr.jpg"

const FilterProductCard = ({data}) => {
    return (
        <div className='filter_product_card'>
            <img src={data?.image} alt="" />
            <div className="filter_product_card_content">
                <h3>{data?.name}</h3>
                <p>{data?.brand?.name}</p>
                <div>
                    <span>{data?.price} AZN</span>
                    <button>Səbətə əlavə et</button>
                </div>
            </div>


        </div>
    )
}

export default FilterProductCard