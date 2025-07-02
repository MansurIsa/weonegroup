import React from 'react'
import IncomeTableHeadLeft from './IncomeTableHeadLeft'
import IncomeTableHeadRight from './IncomeTableHeadRight'
import "./css/income.css"

const IncomeTableHead = () => {
    return (
        <div className='admin_container product_table_head_container'>
            <IncomeTableHeadLeft />
            <IncomeTableHeadRight />
        </div>
    )
}

export default IncomeTableHead