import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersList } from '../../../actions/loginAction/loginAction';
import CustomCustomerSelect from './CustomCustomerSelect';

const CustomerTableHeadLeft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const { usersList } = useSelector(state => state.login);

  const handleCustomerMovement = () => {
    const queryParams = new URLSearchParams();

    if (startDate) queryParams.append('start', startDate);
    if (endDate) queryParams.append('end', endDate);
    if (selectedCustomer) queryParams.append('customerId', selectedCustomer);

    navigate(`/customer-movement?${queryParams.toString()}`);
  };

  return (
    <div className="left_box">
      <h3>Müştəri hərəkəti</h3>

      <div className="form_group">
        <label>Tarix aralığı</label>
        <div className="date_range">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <CustomCustomerSelect
        customers={usersList?.filter(user => !user.is_staff)}
        value={selectedCustomer}
        onChange={(id) => setSelectedCustomer(id)}
      />

      <button onClick={handleCustomerMovement} className="submit_btn">
        Keçid et
      </button>
    </div>
  );
};

export default CustomerTableHeadLeft;
