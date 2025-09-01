import React from 'react'
import Sidebar from '../../components/admin/sidebar/Sidebar'
import AdminHeader from '../../components/admin/adminHeader/AdminHeader'
import "./css/adminLayout.css"

const AdminLayout = ({ children, adminHeader, adminHeaderHide,dashboardSearch }) => {
  return (
    <div className='admin_body_container'>
      <Sidebar />
      <div className="admin_content">
        {
          adminHeaderHide !== true ?
            <AdminHeader adminHeader={adminHeader} dashboardSearch={dashboardSearch} /> : null
        }

        <main>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout