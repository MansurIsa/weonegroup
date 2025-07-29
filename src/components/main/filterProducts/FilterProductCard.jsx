import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProductToCart } from '../../../actions/productsAction/productsAction'
import { getUserObj } from '../../../actions/loginAction/loginAction'
import { FaCartArrowDown } from 'react-icons/fa'

const FilterProductCard = ({ data }) => {
    const accessToken = localStorage.getItem("accessToken")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        dispatch(getUserObj())
    }, [dispatch])

    const { userObj } = useSelector(state => state.login)

    const addToCart = () => {
        if (accessToken) {
            dispatch(addProductToCart({
                quantity: quantity,
                user: userObj?.id,
                product: data?.id
            }, navigate))
        } else {
            navigate("/login")
        }
    }

    const handleIncrement = () => setQuantity(prev => prev + 1)
    const handleDecrement = () => setQuantity(prev => prev > 0 ? prev - 1 : 0)
    const handleInputChange = (e) => {
        let value = e.target.value;

        // Rəqəmdən başqa bir şey daxil olunarsa, icazə vermə
        if (!/^\d*$/.test(value)) return;

        // Əgər boşdursa (backspace ilə silinibsə), sıfır et
        if (value === "") {
            setQuantity(0);
            return;
        }

        // Əgər başda 0 varsa (məs: 01, 007) → avtomatik təmizlə
        value = value.replace(/^0+/, '') || '0';

        setQuantity(parseInt(value, 10));
    };



    const goToDetail = () => {
        navigate(`/products/${data?.id}`)
    }

    return (
        <div className='filter_product_card'>
            {/* 🟢 Clicklə açılan hissə */}
            <div className="filter_product_card_top" onClick={goToDetail} style={{ cursor: 'pointer' }}>
                <img src={data?.image} alt="" />
                <div className="filter_product_card_content">
                    {
                        accessToken &&
                        <span className={+data?.amount > 0
                            ? 'filter_product_card_content_stock_green'
                            : 'filter_product_card_content_stock_red'}>
                            {+data?.amount > 0 ? 'Stokda var' : 'Stokda bitib'}
                        </span>
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
                </div>
            </div>

            {/*  Say və səbətə əlavə hissəsi */}
            <div className="inc_dec_pr">
                <button type="button" onClick={handleDecrement}>-</button>
                <input
                    type="text"
                    inputMode="numeric"
                    value={quantity}
                    onChange={handleInputChange}
                />


                <button type="button" onClick={handleIncrement}>+</button>
                <button
                    type="button"
                    onClick={addToCart}
                    className='add_to_cart_pr'
                >
                    🛒

                </button>
            </div>


        </div>
    )
}

export default FilterProductCard
