import React from 'react'
import "./css/cart.css"
import MainLayout from '../../layouts/mainLayout/MainLayout'
import Img from "../../assets/images/pr.jpg"

const Cart = () => {
  return (
    <MainLayout>
      <section>

        <div className="cart_container project_container">
          <h1>Səbətim (1 məhsul)</h1>
          <div className="cart_left_right_container">
            <div className="cart_left_container">
              <div className="cart_left_products_container">
                <div className='cart_left_first_container'>
                  <input type="checkbox" />
                  <img src={Img} alt="" />
                  <div>
                    <h2>Fren balatası </h2>
                    <p>Toyota Corolla </p>
                  </div>
                </div>
                <span className='cart_left_first_price'>120 AZN</span>
                <div className="inc_dec">
                  <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 8H13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                  <span>1</span>
                  <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 8H13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8 2.5V13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                </div>
              </div>
              <div className="cart_left_products_container">
                <div className='cart_left_first_container'>
                  <input type="checkbox" />
                  <img src={Img} alt="" />
                  <div>
                    <h2>Fren balatası </h2>
                    <p>Toyota Corolla </p>
                  </div>
                </div>
                <span className='cart_left_first_price'>120 AZN</span>
                <div className="inc_dec">
                  <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 8H13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                  <span>1</span>
                  <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 8H13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8 2.5V13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                </div>
              </div>
              <div className="cart_left_products_container">
                <div className='cart_left_first_container'>
                  <input type="checkbox" />
                  <img src={Img} alt="" />
                  <div>
                    <h2>Fren balatası </h2>
                    <p>Toyota Corolla </p>
                  </div>
                </div>
                <span className='cart_left_first_price'>120 AZN</span>
                <div className="inc_dec">
                  <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 8H13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                  <span>1</span>
                  <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 8H13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8 2.5V13.5" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                </div>
              </div>
            </div>
            <div className="cart_right_container">
              <p>Sifarişin məbləği <span>120 AZN</span></p>
              <p>Endirimli məbləğ <span>120 AZN</span></p>
              <button>Sifarişi təstiqlə</button>
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  )
}

export default Cart