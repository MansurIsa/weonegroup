import React from 'react';
import { useDispatch } from 'react-redux';
import { handleCloseModal } from '../../../redux/slices/admin/productTableSlice';
import "./css/modals.css"

const ProductsTableModal = () => {
    const dispatch = useDispatch();

    const brands = ["Castrol", "Opel", "Hyundai", "Toyota", "BMW", "Hyundai", "Toyota", "Opel"];
    const products = Array(7).fill("Mühərrik yağı");

    return (
        <div className="modal_overlay" onClick={() => dispatch(handleCloseModal())}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal_inner_container">
                    {/* Sol tərəf - Markalar */}
                    <div className="product_table_modal_left">
                        <h3 className="brands_title">Markalar</h3>
                        <ul className="brands_list">
                            {brands.map((brand, index) => (
                                <li key={index} className="brand_item">{brand}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Sağ tərəf - Məhsullar */}
                    <div className="product_table_modal_right">
                        <div className="search_box">
                            <input type="text" placeholder="Axtar..." className="search_input" />
                        </div>

                        <ul className="products_list">
                            {products.map((product, index) => (
                                <li key={index} className="product_item">{product}</li>
                            ))}
                        </ul>

                        <div className="select_button_container">
                            <button className="select_button">Seç</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductsTableModal;
