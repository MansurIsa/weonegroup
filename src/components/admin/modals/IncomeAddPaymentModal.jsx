import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeIncomeAddPaymentModal } from '../../../redux/slices/admin/incomeSlices';
import { IoMdClose } from 'react-icons/io';
import { getUsersList } from '../../../actions/loginAction/loginAction';
import { addIncome, getPaymentList } from '../../../actions/incomeAction/incomeAction';
import { useNavigate } from 'react-router-dom';

const IncomeAddPaymentModal = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDatetime, setSelectedDatetime] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const { usersList } = useSelector(state => state.login);

  const handleSubmit = async() => {
    const payload = {
      datetime: selectedDatetime || null,
      amount: amount || null,
      customer: selectedCustomer || null
    };

    console.log('Göndəriləcək məlumat:', payload);
    
   await dispatch(addIncome(payload,navigate)); // <-- Əgər API varsa, buradan göndər
   await dispatch(closeIncomeAddPaymentModal());
   await dispatch(getPaymentList())
  };

  return (
    <div className="modal_overlay" onClick={() => dispatch(closeIncomeAddPaymentModal())}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>

        <div className="modal_inner_container income_add_payment_modal_container">
          <div className="left_box">
            <IoMdClose className='close_icon' onClick={() => dispatch(closeIncomeAddPaymentModal())} />

            <div className="form_group">
              <label>Müştəri</label>
              <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                <option value="">Müştəri seçin</option>
                {usersList?.filter(user => !user.is_staff).map(user => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name} ({user?.username})
                  </option>
                ))}
              </select>
            </div>

            <div className="form_group">
              <label>Tarix</label>
              <input
                type="datetime-local"
                value={selectedDatetime}
                onChange={(e) => setSelectedDatetime(e.target.value)}
              />
            </div>

            <div className="form_group">
              <label>Ödənişi əlavə et</label>
              <input
                type="text"
                placeholder="Ödədiyi məbləği daxil edin"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button className="submit_btn" onClick={handleSubmit}>Yadda saxla</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IncomeAddPaymentModal;
