import React from 'react'
import "./css/productDetail.css"
import Img from "../../../assets/images/fixedPr3.png"
import { Link } from 'react-router-dom'

const ProductDetailContainer = () => {
    return (
        <div className='product_detail_page project_container'>
            <div className="product_detail_page_paths">
                <Link to={'/products'}>Məhsullar</Link>
                /
                <p>aaaa</p>
            </div>
            <div className="product_detail_container">
                <div className='product_detail_container_img'>
                    <img src={Img} alt="" />
                </div>

                <div className="product_detail_container_right">
                    <h1>Məhsul</h1>
                    <div className='product_detail_container_right_cat'>
                        <p>Kateqoriya</p>
                        <p>Marka</p>
                        <p>Brend</p>
                    </div>
                    <p className='product_detail_container_right_detail'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe enim amet optio iure veniam, ab fuga, autem ea beatae minus labore repellat placeat, eum sed sint cupiditate in deleniti quas reiciendis tenetur explicabo suscipit totam! Voluptatem, officia? Aspernatur, nesciunt commodi!</p>
                    <p className='filter_product_card_content_stock_green'>Stokda var</p>
                    {/* <p className='filter_product_card_content_stock_red'>Stokda bitib</p> */}
                    <p className='product_detail_container_right_price'>10 AZN</p>
                    <div className="product_detail_container_right_btn">
                        <button>Səbətə əlavə et</button>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default ProductDetailContainer