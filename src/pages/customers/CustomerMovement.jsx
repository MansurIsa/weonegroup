import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import ProductMovementEnd from '../../components/admin/productMovementEnd/ProductMovementEnd'
import CustomerMovementEnd from '../../components/admin/customerTableHead/CustomerMovementEnd'

const CustomerMovement = () => {
    return (
        <AdminLayout adminHeaderHide={true}>
            <AdminBigComponentHeader adminHeader={"Müştəri  hərəkəti "} hideShowBtn={false} />
            <div className="product_movement_date admin_container">
                <p>Tarix aralığı:</p>
                <p>03.11.2024 - 03.06.2025</p>
            </div>
            <div className='admin_container products_movement_customer_header'>
                <div>Alıcı:
                    <select name="" id="">
                        <option value="">Elçin Quliyev</option>
                        <option value="">Elçin Quliyev</option>
                        <option value="">Elçin Quliyev</option>
                    </select>
                </div>
            </div>

            <SearchInpMain />
            <CustomerMovementEnd />
        </AdminLayout>
    )
}

export default CustomerMovement