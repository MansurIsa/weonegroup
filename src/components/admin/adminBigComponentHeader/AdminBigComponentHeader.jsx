import React from 'react'
import "./css/adminHeaderBigComp.css"

const AdminBigComponentHeader = ({adminHeader}) => {
  return (
    <div className='admin_container admin_big_comp_header'>
        <h2>{adminHeader}</h2>
    </div>
  )
}

export default AdminBigComponentHeader