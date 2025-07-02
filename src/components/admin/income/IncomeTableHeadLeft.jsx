import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const monthlyData = [
  { name: 'Yan', gəlir: 18 },
  { name: 'Fev', gəlir: 22 },
  { name: 'Mar', gəlir: 19 },
  { name: 'Apr', gəlir: 25 },
  { name: 'May', gəlir: 7 },
  { name: 'İyn', gəlir: 22 },
  { name: 'İyl', gəlir: 17 },
  { name: 'Aug', gəlir: 22 },
  { name: 'Sen', gəlir: 19 },
  { name: 'Okt', gəlir: 24 },
  { name: 'Nyb', gəlir: 15 },
  { name: 'Dek', gəlir: 22 },
];

const yearlyData = [
  { name: '2020', gəlir: 150 },
  { name: '2021', gəlir: 180 },
  { name: '2022', gəlir: 210 },
  { name: '2023', gəlir: 240 },
  { name: '2024', gəlir: 280 },
];

const dailyData = [
  { name: '01', gəlir: 1.5 },
  { name: '02', gəlir: 1.8 },
  { name: '03', gəlir: 1.1 },
  { name: '04', gəlir: 2.2 },
  { name: '05', gəlir: 1.9 },
  { name: '06', gəlir: 2.4 },
  { name: '07', gəlir: 2.1 },
];

const colors = ['#66C2FF', '#A0E5A0', '#202020', '#99D6FF', '#BDD2E1', '#A0E5A0', '#6684FF', '#A0E5A0', '#202020', '#99D6FF', '#BDD2E1', '#A0E5A0'];

const IncomeTableHeadLeft = () => {
  const [range, setRange] = useState('Aylıq');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getData = () => {
    switch (range) {
      case 'Günlük':
        return dailyData;
      case 'İllik':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    setDropdownOpen(false);
  };

  return (
    <div className="income_chart_container">
      <div className="income_chart_header">
        <h3 className="income_chart_title">Gəlir</h3>
        <div className="income_chart_dropdown_wrapper">
          <div className="income_chart_dropdown" onClick={toggleDropdown}>
            {range}
            <svg width="12" height="12" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {dropdownOpen && (
            <div className="income_chart_dropdown_menu">
              {['Günlük', 'Aylıq', 'İllik'].map((item) => (
                <div key={item} className="income_chart_dropdown_item" onClick={() => handleRangeChange(item)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={getData()}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ccc" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#ccc"
            tickFormatter={(v) => `${v}M`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(v) => `${v}M`} />
          <Bar dataKey="gəlir" radius={[6, 6, 0, 0]}>
            {getData().map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeTableHeadLeft;
