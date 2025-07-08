import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProductToCart } from '../../../actions/productsAction/productsAction'
import { getUserObj } from '../../../actions/loginAction/loginAction'

const FilterProductCard = ({ data }) => {

    const accessToken = localStorage.getItem("accessToken")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserObj())
    }, [dispatch])

    const { userObj } = useSelector(state => state.login)

    const addToCart = (data) => {
        if (accessToken) {
            console.log(data);
            dispatch(addProductToCart({
                quantity: 1,
                user: userObj?.id,
                product: data?.id
            }, navigate))

        } else {
            navigate("/login")
        }
    }
    return (
        <div className='filter_product_card'>
            <img src={data?.image} alt="" />
            <div className="filter_product_card_content">
                {
                    accessToken?
                    <span
                    className={` ${+data?.amount > 0
                            ? 'filter_product_card_content_stock_green'
                            : 'filter_product_card_content_stock_red'
                        }`}
                >
                    {+data?.amount > 0 ? 'Stokda var' : 'Stokda bitib'}
                </span>: null
                }
                
                <h3>{data?.name}</h3>
                <p>{data?.brand?.name}</p>

                <div>
                    {
                        accessToken ? <span className='filter_product_card_content_price'>{data?.price} AZN</span> : null
                    }
                    {
                        accessToken ? <span>{data?.discount_price} AZN</span> : null
                    }

                   
                </div>
                 <button onClick={() => addToCart(data)}>Səbətə əlavə et</button>
            </div>


        </div>
    )
}

export default FilterProductCard