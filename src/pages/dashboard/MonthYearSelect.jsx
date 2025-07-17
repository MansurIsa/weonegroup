import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserObj, getUsersList } from '../../actions/loginAction/loginAction';
import { getDashboardList } from '../../actions/dashboardAction/dashboardAction';

const MonthYearSelect = () => {
  const today = new Date();
  const defaultYear = String(today.getFullYear());

  const months = [
    { value: 'All', label: 'Bütün aylar' },
    { value: 'Yanvar', label: 'Yanvar' },
    { value: 'Fevral', label: 'Fevral' },
    { value: 'Mart', label: 'Mart' },
    { value: 'Aprel', label: 'Aprel' },
    { value: 'May', label: 'May' },
    { value: 'Iyun', label: 'İyun' },
    { value: 'Iyul', label: 'İyul' },
    { value: 'Avqust', label: 'Avqust' },
    { value: 'Sentyabr', label: 'Sentyabr' },
    { value: 'Oktyabr', label: 'Oktyabr' },
    { value: 'Noyabr', label: 'Noyabr' },
    { value: 'Dekabr', label: 'Dekabr' },
  ];

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const dispatch = useDispatch();
  const { usersList, userObj } = useSelector(state => state.login);

  const years = Array.from({ length: 101 }, (_, i) => 2000 + i);

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getUserObj());
  }, [dispatch]);

  useEffect(() => {
    if (userObj?.is_superuser) {
      setSelectedCustomer(userObj.id);
    }
  }, [userObj]);

  useEffect(() => {
    if (!userObj || !selectedYear || !selectedMonth) return;

    const idToSend = userObj.is_superuser && selectedCustomer
      ? selectedCustomer
      : userObj.id;

    dispatch(getDashboardList(idToSend, selectedMonth, selectedYear));
  }, [selectedYear, selectedMonth, selectedCustomer, userObj, dispatch]);

  return (
    <div className="admin_container">
      <div className="month_year_select">
        <div className="form_group">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">İl seçin</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form_group">
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Ay seçin</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>

        {userObj?.is_superuser && (
          <div className="form_group">
            <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
              <option value="">Admin seçin</option>
              {usersList?.filter(user => user.is_staff).map(user => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} ({user.username})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthYearSelect;
