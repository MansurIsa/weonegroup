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

const routes = [
  { path: "/", element: <Home />, isProtected: false },
  { path: "/about", element: <About />, isProtected: false },
  { path: "/products", element: <Products />, isProtected: false },
  { path: "/contact", element: <Contact />, isProtected: false },
  { path: "/services", element: <Services />, isProtected: false },
  { path: "/cart", element: <Cart />, isProtected: false },
  { path: "/login", element: <Login />, isProtected: false },

  { path: "/dashboard", element: <Dashboard />, isProtected: true },
 
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
    </div>
  )
}

export default App