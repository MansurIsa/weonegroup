import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { closeCustomerUpdateModalFunc } from '../../../redux/slices/loginSlices'
import { deleteCustomer } from '../../../actions/loginAction/loginAction'

const CustomerDeleteModal = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {deleteCustomerId}=useSelector(state=>state.login)
    const handleCustomerDelete=()=>{
        dispatch(deleteCustomer(deleteCustomerId,navigate))
        // dispatch(getSalesList());
    }
    return (
        <div className="modal_overlay" onClick={() => dispatch(closeCustomerUpdateModalFunc())}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <div className="modal_inner_container">
                    <div className="warehouse_content">
                        <h2>Silmək istədiyinizdən əminsiniz?</h2>
                    </div>

                </div>
                <div className='modal_yes_no_btns'>
                    <button onClick={handleCustomerDelete}>Bəli</button>
                    <button onClick={() => dispatch(closeCustomerUpdateModalFunc())}>Xeyr</button>
                </div>
            </div>
        </div>
    )
}

export default CustomerDeleteModal