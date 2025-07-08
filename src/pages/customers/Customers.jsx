import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import CustomerTableHead from '../../components/admin/customerTableHead/CustomerTableHead'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import { useNavigate } from 'react-router-dom'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import CustomerTableEnd from '../../components/admin/customerTableHead/CustomerTableEnd'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersList } from '../../actions/loginAction/loginAction'

const Customers = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [filteredUsers, setFilteredUsers] = useState([])

  const handleClick = () => {
    navigate("/new-customer")
  }

  useEffect(() => {
    dispatch(getUsersList())
  }, [dispatch])

  const { usersList } = useSelector(state => state.login)

  useEffect(() => {
    setFilteredUsers(usersList)
  }, [usersList])

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase()

    const filtered = usersList.filter(user =>
      user.username.toLowerCase().includes(lowerQuery) ||
      user.first_name.toLowerCase().includes(lowerQuery) ||
      user.last_name.toLowerCase().includes(lowerQuery) ||
      user.phone_number?.toLowerCase().includes(lowerQuery) ||
      user.address?.toLowerCase().includes(lowerQuery)
    )

    setFilteredUsers(filtered)
  }

  return (
    <AdminLayout adminHeader="Müştərilər">
      <CustomerTableHead />
      <AdminBigComponentHeader
        adminHeader="Müştəri məlumatları"
        hideShowBtn={true}
        buttonContent="Yeni müştəri əlavə et"
        onClick={handleClick}
      />
      <SearchInpMain onSearch={handleSearch} />
      <CustomerTableEnd usersList={filteredUsers} />
    </AdminLayout>
  )
}

export default Customers
