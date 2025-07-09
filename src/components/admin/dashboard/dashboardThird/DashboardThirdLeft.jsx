import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMostDebtDashboardList } from '../../../../actions/dashboardAction/dashboardAction'

const DashboardThirdLeft = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMostDebtDashboardList())
    }, [dispatch])
    const { mostDebtObj } = useSelector(state => state.dashboard)
    console.log(mostDebtObj);
    
    return (
        <div className='dashboard_third_left'>
            <div className="dashboard_third_left_header">
                <h3>Ən çox borcu olan müştərilər </h3>
                <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z" fill="#FFC900" />
                </svg>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Müştəri Adı</th>
                        {/* <th>Kodu</th> */}
                        <th>Borcu</th>
                        <th>Əlaqə</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mostDebtObj?.most_indebted_customers?.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {data?.name}
                                    </td>
                                    
                                    <td>
                                        {data?.debt} ₼
                                    </td>
                                    <td>
                                       {data?.phone_number}
                                    </td>


                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
        </div>
    )
}

export default DashboardThirdLeft