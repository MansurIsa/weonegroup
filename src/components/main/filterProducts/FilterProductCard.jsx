import React from 'react'
import { useNavigate } from 'react-router-dom'

const FilterProductCard = ({data}) => {

    const accessToken=localStorage.getItem("accessToken")
    const navigate=useNavigate()

    const addToCart=(id)=>{
        if(accessToken){
            
        }else{
            navigate("/login")
        }
    }
    return (
        <div className='filter_product_card'>
            <img src={data?.image} alt="" />
            <div className="filter_product_card_content">
                <h3>{data?.name}</h3>
                <p>{data?.brand?.name}</p>
                <div>
                    {
                        accessToken?  <span>{data?.price} AZN</span>: null
                    }
                 
                    <button onClick={()=>addToCart(data?.id)}>Səbətə əlavə et</button>
                </div>
            </div>


        </div>
    )
}

export default FilterProductCard