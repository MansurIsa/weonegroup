import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import { useNavigate } from 'react-router-dom'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import WarehouseProducts from '../../components/admin/warehouseEnd/WarehouseProducts'
import { useDispatch, useSelector } from 'react-redux'
import { getStockList } from '../../actions/stockActions/stockActions'

const Warehouse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = () => {
    navigate("/new-warehouse")
  }

  useEffect(() => {
    dispatch(getStockList())
  }, [dispatch])

  const { stockList } = useSelector(state => state.stock)

  const [filteredStocks, setFilteredStocks] = useState([])

  useEffect(() => {
    setFilteredStocks(stockList)
  }, [stockList])

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase()

    const filtered = stockList.filter(item => {
      const nameMatch = item?.product?.name?.toLowerCase().includes(lowerQuery)
      const articleMatch = item?.product?.articles?.some(article =>
        article.name.toLowerCase().includes(lowerQuery)
      )
      return nameMatch || articleMatch
    })

    setFilteredStocks(filtered)
  }

  return (
    <AdminLayout adminHeader="Anbar">
      <AdminBigComponentHeader
        adminHeader="Anbardakı məhsullar"
        hideShowBtn={true}
        buttonContent="Yeni məhsul əlavə et"
        onClick={handleClick}
      />
      <SearchInpMain onSearch={handleSearch} />
      <WarehouseProducts stockList={filteredStocks} />
    </AdminLayout>
  )
}

export default Warehouse
