import React, { useState } from 'react';
import { FaListUl } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { handleOpenModal } from '../../../redux/slices/admin/productTableSlice';
import { useNavigate } from 'react-router-dom';

const ProductTableHeadLeft = () => {
    
const dispatch=useDispatch()
const navigate=useNavigate()


const handleProductMovement=()=>{
    navigate("/product-movement")
}

    return (
        <div className="left_box">
            <h3>Məhsul hərəkəti</h3>

            <div className="form_group">
                <label>Tarix aralığı</label>
                <div className="date_range">
                    <input type="date" defaultValue="2024-11-03" />
                    <input type="date" defaultValue="2025-06-03" />
                </div>
            </div>

            <div className="form_group">
                <label>Hesabat növü</label>
                <select>
                    <option>Məhsul hərəkəti</option>
                </select>
            </div>

            <div className="form_row">
                {/* Məhsul seçimi */}
                <div className="half_width">
                    <label>Məhsul seçimi</label>
                    <div className="input_with_icon" onClick={()=>dispatch(handleOpenModal())}>
                        <input type="text" placeholder="Məhsulu seç" readOnly />
                        <svg className='input_icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 1.5H6C5.60218 1.5 5.22064 1.65804 4.93934 1.93934C4.65804 2.22064 4.5 2.60218 4.5 3V6H3V7.5H4.5V11.25H3V12.75H4.5V16.5H3V18H4.5V21C4.5 21.3978 4.65804 21.7794 4.93934 22.0607C5.22064 22.342 5.60218 22.5 6 22.5H19.5C19.8978 22.5 20.2794 22.342 20.5607 22.0607C20.842 21.7794 21 21.3978 21 21V3C21 2.60218 20.842 2.22064 20.5607 1.93934C20.2794 1.65804 19.8978 1.5 19.5 1.5ZM19.5 21H6V18H7.5V16.5H6V12.75H7.5V11.25H6V7.5H7.5V6H6V3H19.5V21Z" fill="#202020" />
                            <path d="M10.5 6H16.5V7.5H10.5V6ZM10.5 11.25H16.5V12.75H10.5V11.25ZM10.5 16.5H16.5V18H10.5V16.5Z" fill="#202020" />
                        </svg>
                    </div>
                </div>

                {/* Təfərrüat */}
                <div className="half_width">
                    <label>Təfərrüat</label>
                    <div className="checkbox_group">
                        <label><input type="checkbox" /> Anbara görə</label>
                        <label><input type="checkbox" /> Sənədlərə görə</label>
                    </div>
                </div>
            </div>

            <button onClick={handleProductMovement} className="submit_btn">Keçid et</button>

            
           
        </div>
    );
};

export default ProductTableHeadLeft;
