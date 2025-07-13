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
                    accessToken ?
                        <span
                            className={` ${+data?.amount > 0
                                ? 'filter_product_card_content_stock_green'
                                : 'filter_product_card_content_stock_red'
                                }`}
                        >
                            {+data?.amount > 0 ? 'Stokda var' : 'Stokda bitib'}
                        </span> : null
                }

                <h3>{data?.name}</h3>
                <p>{data?.brand?.name}</p>

                <div>
                    {
                        accessToken && userObj?.status === "S" &&
                        <span>{data?.price} AZN</span>
                    }

                    {
                        accessToken && userObj?.status === "E" &&
                        <span>{data?.discount_price} AZN</span>
                    }

                 
                </div>

                <button
                    onClick={() => {
                        if (!accessToken || +data?.amount > 0) {
                            addToCart(data);
                        }
                    }}
                    disabled={accessToken && +data?.amount <= 0}
                >
                    Səbətə əlavə et
                </button>

            </div>


        </div>
    )
}

export default FilterProductCard