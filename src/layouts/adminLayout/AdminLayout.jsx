import React from 'react'
import Sidebar from '../../components/admin/sidebar/Sidebar'
import AdminHeader from '../../components/admin/adminHeader/AdminHeader'
import "./css/adminLayout.css"

const AdminLayout = ({children}) => {
  return (
    <div>
        <Sidebar/>
        <div className="admin_content">
            <AdminHeader/>
            {children}
        </div>
    </div>
  )
}

export default AdminLayout