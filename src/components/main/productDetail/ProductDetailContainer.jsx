import React from 'react'
import "./css/productDetail.css"
import Img from "../../../assets/images/fixedPr3.png"
import { Link, useNavigate } from 'react-router-dom'
import { addProductToCart } from '../../../actions/productsAction/productsAction'
import { useDispatch } from 'react-redux'

const ProductDetailContainer = ({ productObj, userObj }) => {
    console.log(userObj);

    const accessToken = localStorage.getItem("accessToken")
    const dispatch = useDispatch()
    const navigate = useNavigate()


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
        <div className='product_detail_page project_container'>
            <div className="product_detail_page_paths">
                <Link to={'/products'}>Məhsullar</Link>
                /
                <p>{productObj?.name}</p>
            </div>
            <div className="product_detail_container">
                <div className='product_detail_container_img'>
                    <img src={productObj?.image} alt="" />
                </div>

                <div className="product_detail_container_right">
                    <div className="product_detail_container_right_color">
                        <h1>{productObj?.name}</h1>
                         {
                            accessToken ? (
                                productObj?.amount > 0 ? (
                                    <p className='filter_product_card_content_stock_green'>Stokda var</p>
                                ) : (
                                    <p className='filter_product_card_content_stock_red'>Stokda bitib</p>
                                )
                            ) : null
                        }
                    </div>
                    
                    <div className='product_detail_container_right_cat'>
                        <p>{productObj?.category?.name}</p>
                        <p>{productObj?.brand?.name}</p>
                        <p>{productObj?.store?.name}</p>

                       

                    </div>
                    <div
                        className="product_detail_container_right_detail about_html_content"
                        dangerouslySetInnerHTML={{ __html: productObj?.about }}
                    />


                    {
                        accessToken ?
                            <p className='product_detail_container_right_price'>{userObj?.status === "S" ? productObj?.price : accessToken && "E" ? productObj?.discount_price : null} AZN</p> : null
                    }

                    <div className="product_detail_container_right_btn">
                        <button
                            onClick={() => {

                                addToCart(productObj);

                            }}

                        >
                            Səbətə əlavə et
                        </button>
                    </div>



                </div>
            </div>

        </div>
    )
}

export default ProductDetailContainer