import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import About from './pages/about/About';
import Products from './pages/products/Products';
import Contact from './pages/contact/Contact';
import Services from './pages/services/Services';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/dashboard/Dashboard';
import Loader from './components/loader/Loader';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import Purchase from './pages/purchase/Purchase';
import Warehouse from './pages/warehouse/Warehouse';
import ProductsTable from './pages/productsTable/ProductsTable';
import ProductsReturned from './pages/productsReturned/ProductsReturned';
import Sales from './pages/sales/Sales';
import Customers from './pages/customers/Customers';
import NewPurchase from './pages/purchase/NewPurchase';
import NewWarehouse from './pages/warehouse/NewWarehouse';
import NewProducts from './pages/productsTable/NewProducts';
import ProductsMovement from './pages/productsTable/ProductsMovement';
import ProductsMovementCustomer from './pages/productsTable/ProductsMovementCustomer';
import SalesProductsCustomer from './pages/sales/SalesProductsCustomer';
import SalesProductsSelect from './pages/sales/SalesProductsSelect';
import CustomerMovement from './pages/customers/CustomerMovement';
import NewCustomer from './pages/customers/NewCustomer';
import CustomerMovementFacture from './pages/customers/CustomerMovementFacture';

const routes = [
  { path: "/", element: <Home />, isProtected: false },
  { path: "/about", element: <About />, isProtected: false },
  { path: "/products", element: <Products />, isProtected: false },
  { path: "/contact", element: <Contact />, isProtected: false },
  { path: "/services", element: <Services />, isProtected: false },
  { path: "/cart", element: <Cart />, isProtected: false },
  { path: "/login", element: <Login />, isProtected: false },

  { path: "/dashboard", element: <Dashboard />, isProtected: true },
  { path: "/purchase", element: <Purchase />, isProtected: true },
  { path: "/new-purchase", element: <NewPurchase />, isProtected: true },
  { path: "/warehouse", element: <Warehouse />, isProtected: true },
  { path: "/new-warehouse", element: <NewWarehouse />, isProtected: true },
  { path: "/products-table", element: <ProductsTable />, isProtected: true },
  { path: "/new-products", element: <NewProducts />, isProtected: true },
  { path: "/product-movement", element: <ProductsMovement />, isProtected: true },
  { path: "/product-movement-customer", element: <ProductsMovementCustomer />, isProtected: true },
  { path: "/products-returned", element: <ProductsReturned />, isProtected: true },
  { path: "/income", element: <ProductsReturned />, isProtected: true },
  { path: "/expense", element: <ProductsReturned />, isProtected: true },
  { path: "/sales", element: <Sales />, isProtected: true },
   { path: "/product-sales-customer", element: <SalesProductsCustomer />, isProtected: true },
   { path: "/sales-products-select", element: <SalesProductsSelect />, isProtected: true },
  { path: "/customers", element: <Customers />, isProtected: true },
 { path: "/customer-movement", element: <CustomerMovement />, isProtected: true },
 { path: "/customer-movement-facture", element: <CustomerMovementFacture/>, isProtected: true },
  { path: "/new-customer", element: <NewCustomer />, isProtected: true },
];

const App = () => {
  return (
    <div>
       <Routes>
        {routes?.map((route, i) => {
          return <Route key={i} path={route.path} element={route.element} />;
        })}
      </Routes>
      <Toaster position="top-right" />
      <Loader/>
      <ScrollToTop/>
    </div>
  )
}

export default App