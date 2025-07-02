import React from 'react'
import { useDispatch } from 'react-redux'
import { closeIncomeAddPaymentModal } from '../../../redux/slices/admin/incomeSlices'
import { IoMdClose } from 'react-icons/io'

const IncomeAddPaymentModal = () => {
    const dispatch = useDispatch()
    return (
        <div className="modal_overlay" onClick={() => dispatch(closeIncomeAddPaymentModal())}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>

                <div className="modal_inner_container income_add_payment_modal_container">
                    <div className="left_box">
                        <IoMdClose className='close_icon' onClick={() => dispatch(closeIncomeAddPaymentModal())}/>


                        <div className="form_group">
                            <label>Müştəri </label>
                            <select name="" id="">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Tarix </label>
                            <input type="date" />
                        </div>
                        <div className="form_group">
                            <label>Ödənişi əlave et </label>
                            <input type="text" placeholder='Ödədiyi məbləği daxil edin'/>
                        </div>



                        <button className="submit_btn">Keçid et</button>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomeAddPaymentModal