import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import ProductMovementEnd from '../../components/admin/productMovementEnd/ProductMovementEnd'

const ProductsMovement = () => {
  return (
    <AdminLayout adminHeaderHide={true}>
         <AdminBigComponentHeader adminHeader={"Məhsul hərəkəti"} hideShowBtn={false} />
         <div className="product_movement_date admin_container">
            <p>Tarix aralığı</p>
            <p>03.11.2024 - 03.06.2025</p>
         </div>
         <SearchInpMain/>
         <ProductMovementEnd/>
    </AdminLayout>
  )
}

export default ProductsMovement