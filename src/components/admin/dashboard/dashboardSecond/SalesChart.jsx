import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import "./css/salesChart.css";
import { useDispatch, useSelector } from 'react-redux';
import { getChartsDashboardList } from '../../../../actions/dashboardAction/dashboardAction';

const SalesChart = () => {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("A"); // "A" - aylıq, "I" - illik

  useEffect(() => {
    dispatch(getChartsDashboardList(filterType));
  }, [dispatch, filterType]);

  const { chartObj } = useSelector(state => state.dashboard);

  const salesData = chartObj
    ? Object.entries(chartObj).map(([key, value]) => ({
        label: key,
        value: value,
      }))
    : [];

  return (
    <div className='sales_chart_container admin_container'>
      <div className="chart_header">
        <h3>Satışın dinamikası</h3>
        <div className="chart_controls">
          <div className="dropdown">
            <span className="calendar_icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.75 15.75H4.5C4.10218 15.75 3.72064 15.592 3.43934 15.3107C3.15804 15.0294 3 14.6478 3 14.25V5.25C3 4.85218 3.15804 4.47064 3.43934 4.18934C3.72064 3.90804 4.10218 3.75 4.5 3.75H13.5C13.8978 3.75 14.2794 3.90804 14.5607 4.18934C14.842 4.47064 15 4.85218 15 5.25V7.5M12 2.25V5.25M6 2.25V5.25M3 8.25H12.375M15.75 11.25H13.875C13.5766 11.25 13.2905 11.3685 13.0795 11.5795C12.8685 11.7905 12.75 12.0766 12.75 12.375C12.75 12.6734 12.8685 12.9595 13.0795 13.1705C13.2905 13.3815 13.5766 13.5 13.875 13.5H14.625C14.9234 13.5 15.2095 13.6185 15.4205 13.8295C15.6315 14.0405 15.75 14.3266 15.75 14.625C15.75 14.9234 15.6315 15.2095 15.4205 15.4205C15.2095 15.6315 14.9234 15.75 14.625 15.75H12.75M14.25 15.75V16.5M14.25 10.5V11.25" stroke="#202020" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="A">Aylıq</option>
              <option value="I">İllik</option>
            </select>
          </div>
        </div>
      </div>

      <ResponsiveContainer>
        <AreaChart
          data={salesData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorTotal)"
            name="Satış"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
