import React from 'react'
import Img from "../../../assets/images/pr.jpg"

const FilterProductCard = () => {
    return (
        <div className='filter_product_card'>
            <img src={Img} alt="" />
            <div className="filter_product_card_content">
                <h3>Fren balatası </h3>
                <p>Toyota Corolla</p>
                <div>
                    <span>120 AZN</span>
                    <button>Səbətə əlavə et</button>
                </div>
            </div>


        </div>
    )
}

export default FilterProductCard