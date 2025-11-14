import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

const CustomerRetriveModal = ({closeModal}) => {
    const { customerRetriveObj } = useSelector(state => state.login)
    console.log(customerRetriveObj);

   
    return (
        <div className="modal_overlay" onClick={closeModal}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <div className="modal_inner_container customer_retrive_modal">

                    <IoMdClose className='close_icon' onClick={closeModal} />

                    <div>

                        <h4>Bizə Borc:</h4>
                        <p>{`${Math.round(customerRetriveObj?.customer_debt_amount * 100) / 100 || 0} ₼`}</p>
                    </div>
                    <div>
                        <h4>Bizim Borc:</h4>
                        <p>
                            {Array.isArray(customerRetriveObj?.our_debt_amount) ? (() => {
                                const [manat, dollar, rubl] = customerRetriveObj.our_debt_amount;
                                const debts = [];
                                if (manat !== 0) debts.push(`${manat} ₼`);
                                if (dollar !== 0) debts.push(`${dollar} $`);
                                if (rubl !== 0) debts.push(`${rubl} ₽`);
                                return debts.length > 0 ? debts.join(' | ') : '0 ₼';
                            })() : `${customerRetriveObj?.our_debt_amount || 0} ₼`}
                        </p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CustomerRetriveModal