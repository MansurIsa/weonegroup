import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserObj, getUsersList } from '../../actions/loginAction/loginAction';
import { getDashboardList } from '../../actions/dashboardAction/dashboardAction';

const MonthYearSelect = () => {
  const today = new Date();
  const defaultMonthIndex = String(today.getMonth() + 1).padStart(2, '0');
  const defaultYear = String(today.getFullYear());

  const months = [
    { value: '01', label: 'Yanvar' },
    { value: '02', label: 'Fevral' },
    { value: '03', label: 'Mart' },
    { value: '04', label: 'Aprel' },
    { value: '05', label: 'May' },
    { value: '06', label: 'Iyun' },
    { value: '07', label: 'Iyul' },
    { value: '08', label: 'Avqust' },
    { value: '09', label: 'Sentyabr' },
    { value: '10', label: 'Oktyabr' },
    { value: '11', label: 'Noyabr' },
    { value: '12', label: 'Dekabr' },
  ];

  const defaultMonthLabel = months.find(m => m.value === defaultMonthIndex)?.label || '';

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonthLabel);
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
          {/* <label>İl</label> */}
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">İl seçin</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form_group">
          {/* <label>Ay</label> */}
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Ay seçin</option>
            {months.map((month) => (
              <option key={month.value} value={month.label}>{month.label}</option>
            ))}
          </select>
        </div>

        {userObj?.is_superuser && (
          <div className="form_group">
            {/* <label>Admin</label> */}
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
