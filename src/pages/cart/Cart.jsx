import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/mainLayout/MainLayout';
import './css/cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { basketClear, basketItemDelete, basketItemUpdate, getBasketItemList, orderCreate } from '../../actions/basketAction/basketAction';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';

const Cart = () => {
  const dispatch = useDispatch();
  const { basketItem } = useSelector((state) => state.basket);
  console.log(basketItem);
  

  const [selectedItems, setSelectedItems] = useState([]);

  // Basket item-ları yüklə
  useEffect(() => {
    dispatch(getBasketItemList());
  }, [dispatch]);

  // Basket item gəldikdə, hamısını seçilmiş kimi qeyd et
  useEffect(() => {
    if (basketItem?.length > 0) {
      const allIds = basketItem.map(item => item.id);
      setSelectedItems(allIds);
    }
  }, [basketItem]);

  // Checkbox dəyişəndə seçimi yenilə
  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Ümumi məbləğ hesabla
  const totalAmount = basketItem
    ?.filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  // const discountedAmount = totalAmount * 0.9;

  // WhatsApp-a göndərmə funksiyası
 const handleConfirmOrder = () => {
  if (selectedItems.length === 0) return;

  const selectedProducts = basketItem.filter(item =>
    selectedItems.includes(item.id)
  );

  // Product ID-lər
  const productIds = selectedProducts.map(item => item.product.id);

  // Müvafiq quantity-lər
  const quantities = selectedProducts.map(item => item.quantity);

  // Total price
  const total = selectedProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Payload
  const payload = {
    products: productIds,
    quantities: quantities,
    amount: total
  };

  console.log("Payload:", payload);

  // Backend-ə göndər
  dispatch(orderCreate(payload));

  // Səbəti təmizlə
  const selectedBasketIds = selectedProducts.map(item => item.id);
  dispatch(basketClear({ item_ids: selectedBasketIds }));
 
};


  const incCartEl = (item) => {
  const updatedQuantity = item.quantity + 1;

  dispatch(basketItemUpdate(item.id, {
    product: item.product.id,
    user: item.user,
    quantity: updatedQuantity
  }));
};

const decCartEl = (item) => {
  if (item.quantity <= 1) return; // 0-a düşməyə icazə vermə

  const updatedQuantity = item.quantity - 1;

  dispatch(basketItemUpdate(item.id, {
    product: item.product.id,
    user: item.user,
    quantity: updatedQuantity
  }));
};


const deleteBasketItem=(id)=>{
  dispatch(basketItemDelete(id))
}


  return (
    <MainLayout>
      <section>
        {
          basketItem?.length === 0 ?
            <div className="empty_cart">
              <h2>Səbətiniz boşdur</h2>
              <p>Zəhmət olmasa, məhsul əlavə edin.</p>
              <Link to={'/products'} className="go_shop_btn">Alış-verişə davam et</Link>
            </div> :
            <div className="cart_container project_container">
              <h1>Səbətim ({basketItem?.length} məhsul)</h1>
              <div className="cart_left_right_container">
                <div className="cart_left_container">
                  {basketItem?.map(item => (
                    <div key={item.id} className="cart_left_products_container">
                      <div className="cart_left_first_container">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                        <img src={item.product.image} alt={item.product.name} />
                        <div>
                          <h2>{item.product.name}</h2>
                          <p>{item.product.brand.name}</p>
                        </div>
                      </div>
                      <span className="cart_left_first_price">{item.product.price} AZN</span>
                      <div className="inc_dec">
                        <button onClick={()=>decCartEl(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={()=>incCartEl(item)}>+</button>
                      </div>
                      <AiOutlineDelete onClick={()=>deleteBasketItem(item?.id)} className='delete_basket_item'/>
                    </div>
                  ))}
                </div>
                <div className="cart_right_container">
                  <p>Sifarişin məbləği <span>{totalAmount.toFixed(2)} AZN</span></p>
                  {/* <p>Endirimli məbləğ <span>{discountedAmount.toFixed(2)} AZN</span></p> */}
                  <button
                    disabled={selectedItems.length === 0}
                    onClick={handleConfirmOrder}
                  >
                    Sifariş et
                  </button>
                </div>
              </div>
            </div>
        }

      </section>
    </MainLayout>
  );
};

export default Cart;
