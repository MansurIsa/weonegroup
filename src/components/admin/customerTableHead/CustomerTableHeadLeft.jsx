import React, { useState } from 'react';
import { FaListUl } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { handleOpenModal } from '../../../redux/slices/admin/productTableSlice';
import { useNavigate } from 'react-router-dom';

const CustomerTableHeadLeft = () => {
    
const dispatch=useDispatch()
const navigate=useNavigate()


const handleCustomerMovement=()=>{
    navigate("/customer-movement")
}

    return (
        <div className="left_box">
            <h3>Müştəri  hərəkəti </h3>

            <div className="form_group">
                <label>Tarix aralığı</label>
                <div className="date_range">
                    <input type="date" defaultValue="2024-11-03" />
                    <input type="date" defaultValue="2025-06-03" />
                </div>
            </div>

            <div className="form_group">
                <label>Müştəri </label>
                <select>
                    <option>Müştərini seç</option>
                </select>
            </div>

            

            <button onClick={handleCustomerMovement} className="submit_btn">Keçid et</button>

            
           
        </div>
    );
};

export default CustomerTableHeadLeft;
