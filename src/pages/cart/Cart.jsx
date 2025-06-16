import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/mainLayout/MainLayout';
import './css/cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { basketClear, getBasketItemList } from '../../actions/basketAction/basketAction';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { basketItem } = useSelector((state) => state.basket);

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

  const discountedAmount = totalAmount * 0.9;

  // WhatsApp-a göndərmə funksiyası
  const handleConfirmOrder = () => {
    if (selectedItems.length === 0) return;

    const selectedProducts = basketItem.filter(item => selectedItems.includes(item.id));

    // Seçilmiş məhsulların ID-lərindən ibarət array
    const selectedIdsArray = selectedProducts.map(item => item.id);

    console.log('Seçilmiş məhsulların ID-ləri:', selectedIdsArray);

    const message = selectedProducts.map(item =>
      `${item.product.name} (${item.product.brand.name}) - ${item.quantity} ədəd - ${item.product.price} AZN`
    ).join('\n');

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '994516971835'; // Ölkə kodu ilə nömrəni yaz (0 olmadan)
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');

    dispatch(basketClear({ item_ids: selectedIdsArray }))
    window.location.reload()
  };


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
                        <button>-</button>
                        <span>{item.quantity}</span>
                        <button>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart_right_container">
                  <p>Sifarişin məbləği <span>{totalAmount.toFixed(2)} AZN</span></p>
                  <p>Endirimli məbləğ <span>{discountedAmount.toFixed(2)} AZN</span></p>
                  <button
                    disabled={selectedItems.length === 0}
                    onClick={handleConfirmOrder}
                  >
                    WhatsApp ilə göndər
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
