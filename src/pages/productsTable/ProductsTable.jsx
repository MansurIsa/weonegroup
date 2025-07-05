import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import ProductTableHead from '../../components/admin/productTableHead/ProductTableHead'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import { useNavigate } from 'react-router-dom'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import ProductsTableEnd from '../../components/admin/productsTableEnd/ProductsTableEnd'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../../actions/productsAction/productsAction'

const ProductsTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [filteredProducts, setFilteredProducts] = useState([])
  const { productsList } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getProductsList())
  }, [dispatch])

  useEffect(() => {
    setFilteredProducts(productsList)
  }, [productsList])

  const handleClick = () => {
    navigate("/new-products")
  }

  const handleSearch = (query) => {
    const filtered = productsList.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(query)
      const articlesMatch = product.articles.some(article =>
        article.name.toLowerCase().includes(query)
      )
      return nameMatch || articlesMatch
    })

    setFilteredProducts(filtered)
  }

  return (
    <AdminLayout adminHeader="Məhsullar">
      <ProductTableHead />
      <AdminBigComponentHeader
        adminHeader={"Məhsul cədvəli"}
        hideShowBtn={true}
        buttonContent="Yeni məhsul əlave et"
        onClick={handleClick}
      />
      <SearchInpMain onSearch={handleSearch} />
      <ProductsTableEnd productsList={filteredProducts} />
    </AdminLayout>
  )
}

export default ProductsTable
