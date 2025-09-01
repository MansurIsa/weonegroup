import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserObj, getUsersList } from "../../actions/loginAction/loginAction";
import { getDashboardList } from "../../actions/dashboardAction/dashboardAction";
import CustomCustomerSelect from "../../components/admin/salesTableHead/CustomCustomerSelect";

const MonthYearSelect = () => {
  const today = new Date();
  const defaultYear = String(today.getFullYear());

  const months = [
    { value: "All", label: "Bütün aylar" },
    { value: "Yanvar", label: "Yanvar" },
    { value: "Fevral", label: "Fevral" },
    { value: "Mart", label: "Mart" },
    { value: "Aprel", label: "Aprel" },
    { value: "May", label: "May" },
    { value: "Iyun", label: "İyun" },
    { value: "Iyul", label: "İyul" },
    { value: "Avqust", label: "Avqust" },
    { value: "Sentyabr", label: "Sentyabr" },
    { value: "Oktyabr", label: "Oktyabr" },
    { value: "Noyabr", label: "Noyabr" },
    { value: "Dekabr", label: "Dekabr" },
  ];

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const dispatch = useDispatch();
  const { usersList, userObj } = useSelector((state) => state.login);

  const years = Array.from({ length: 101 }, (_, i) => 2000 + i);

  useEffect(() => {
    dispatch(getUsersList()); // ilk load üçün
    dispatch(getUserObj());
  }, [dispatch]);

  useEffect(() => {
    if (userObj?.is_superuser) {
      setSelectedCustomerId(userObj.id);
    }
  }, [userObj]);

  useEffect(() => {
    if (!userObj || !selectedYear || !selectedMonth) return;

    const idToSend =
      userObj.is_superuser && selectedCustomerId
        ? selectedCustomerId
        : userObj.id;

    dispatch(getDashboardList(idToSend, selectedMonth, selectedYear));
  }, [selectedYear, selectedMonth, selectedCustomerId, userObj, dispatch]);

  // yalnız is_staff == true olan user-lər filterlənir
  const staffUsers = usersList.filter((u) => u.is_staff);

  // search üçün API call
const handleSearch = (searchTerm) => {
  if (!searchTerm.trim()) {
    // input boşaldılanda bütün userləri gətir
    dispatch(getUsersList());
  } else {
    // inputda yazılanda filtrli gətir
    dispatch(getUsersList(1, searchTerm));
  }
};


  return (
    <div className="admin_container">
      <div className="month_year_select">
        <div className="form_group">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">İl seçin</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="form_group">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Ay seçin</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        {userObj?.is_superuser && (
          <CustomCustomerSelect
          displayVal={false}
            customers={staffUsers}
            value={selectedCustomerId}
            onChange={(id) => setSelectedCustomerId(id)}
            onSearch={handleSearch} // search yazılanda API çağırır
          />
        )}
      </div>
    </div>
  );
};

export default MonthYearSelect;
