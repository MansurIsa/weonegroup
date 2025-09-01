import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeIncomeAddPaymentModal } from '../../../redux/slices/admin/incomeSlices';
import { IoMdClose } from 'react-icons/io';
import { getUsersList } from '../../../actions/loginAction/loginAction';
import { addIncome, addIncomeSale, getPaymentList } from '../../../actions/incomeAction/incomeAction';
import { useNavigate } from 'react-router-dom';
import CustomCustomerSelect from '../customerTableHead/CustomCustomerSelect';

const IncomeAddPaymentModal = ({ salesNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDatetime, setSelectedDatetime] = useState('');
  const [amount, setAmount] = useState('');
  const searchTimeout = useRef(null);

  useEffect(() => {
    dispatch(getUsersList(1, ""));
  }, [dispatch]);

  const { usersList } = useSelector(state => state.login);

  // 🔍 Müştəri axtarışı (debounce ilə backend search)
  const handleCustomerSearch = (value) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      dispatch(getUsersList(1, value));
    }, 500);
  };

  const handleSubmit = async () => {
    const payload = {
      datetime: selectedDatetime || null,
      amount: amount || null,
      customer: salesNavigate===true? +localStorage.getItem("customerId"): selectedCustomer 
    };

    console.log('Göndəriləcək məlumat:', payload);
    if (salesNavigate) {
      await dispatch(addIncomeSale(payload, navigate));
    } else {
      await dispatch(addIncome(payload, navigate));
    }


    await dispatch(closeIncomeAddPaymentModal());
    await dispatch(getPaymentList());
  };

  return (
    <div className="modal_overlay" onClick={() => dispatch(closeIncomeAddPaymentModal())}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_inner_container income_add_payment_modal_container">
          <div className="left_box">
            <IoMdClose
              className="close_icon"
              onClick={() => dispatch(closeIncomeAddPaymentModal())}
            />

            <div className="form_group">
              {!salesNavigate? 
               <CustomCustomerSelect
                customers={usersList?.filter(user => !user.is_staff)}
                value={selectedCustomer}
                onChange={setSelectedCustomer}
                onSearch={handleCustomerSearch}
              />: null
            }
             
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
