import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import './css/purchase.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandList, getCategoryList, getProductsList } from '../../actions/productsAction/productsAction';
import { addPurchase } from '../../actions/purchaseAction/purchaseAction';

const NewPurchase = () => {
    const [formData, setFormData] = useState({
        brand: '',
        category: '',
        productId: '',
        quantity: '',
        costPrice: '',
        purchaseCurrency: '',        // Valyuta seçimi (azn, usd, rub)
        purchasePriceValue: '',      // Seçilən valyutaya uyğun alış qiyməti
        salePrice: '',
        discountPrice: '',
        status: 'G',
        purchaseDate: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrandList());
        dispatch(getCategoryList());
        dispatch(getProductsList());
    }, [dispatch]);

    const { productsList, categoryList, brandList } = useSelector(state => state.products);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            product: +formData.productId,
            amount: +formData.quantity,
            date: formData.purchaseDate,
            status: formData.status,
            cost_price: parseFloat(formData.costPrice),
            purchase_price: parseFloat(formData.purchasePriceValue),
            price: parseFloat(formData.salePrice),
            discount_price: parseFloat(formData.discountPrice)
        };

        console.log("Backend-ə göndəriləcək data:", payload);
        dispatch(addPurchase(payload, navigate));
    };

    const returnPurchase = () => {
        navigate("/purchase");
    };

    const filteredProducts = productsList.filter(p =>
        (!formData.brand || p.brand?.id === +formData.brand) &&
        (!formData.category || p.category?.id === +formData.category)
    );

    return (
        <AdminLayout adminHeaderHide={true}>
            <div className="admin_container new_purchase_form">
                <div className="return_btn">
                    <button onClick={returnPurchase}>Geri dön</button>
                </div>

                <h2>Yeni alış əlavə et</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form_grid">

                        <div className="form_group">
                            <label>Marka</label>
                            <select name="brand" value={formData.brand} onChange={handleChange}>
                                <option value="">Marka seçin</option>
                                {brandList?.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Kateqoriya</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Kateqoriya seçin</option>
                                {categoryList?.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Məhsul</label>
                            <select name="productId" value={formData.productId} onChange={handleChange}>
                                <option value="">Məhsul seçin</option>
                                {filteredProducts?.map((product) => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Miqdar</label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Miqdarı daxil edin"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Maya dəyəri (AZN)</label>
                            <input
                                type="text"
                                name="costPrice"
                                placeholder="Maya dəyərini daxil edin"
                                value={formData.costPrice}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Alış valyutası</label>
                            <select
                                name="purchaseCurrency"
                                value={formData.purchaseCurrency}
                                onChange={handleChange}
                            >
                                <option value="">Valyuta seçin</option>
                                <option value="azn">₼ AZN</option>
                                <option value="usd">$ USD</option>
                                <option value="rub">₽ RUB</option>
                            </select>
                        </div>

                        {formData.purchaseCurrency && (
                            <div className="form_group">
                                <label>
                                    Alış qiyməti (
                                    {formData.purchaseCurrency === 'azn'
                                        ? '₼'
                                        : formData.purchaseCurrency === 'usd'
                                        ? '$'
                                        : '₽'}
                                    )
                                </label>
                                <input
                                    type="text"
                                    name="purchasePriceValue"
                                    placeholder="Alış qiymətini daxil edin"
                                    value={formData.purchasePriceValue}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        <div className="form_group">
                            <label>Satış qiyməti (AZN)</label>
                            <input
                                type="text"
                                name="salePrice"
                                placeholder="Satış qiymətini daxil edin"
                                value={formData.salePrice}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Endirimli qiymət (AZN)</label>
                            <input
                                type="text"
                                name="discountPrice"
                                placeholder="Endirimli qiyməti daxil edin"
                                value={formData.discountPrice}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="G">Gözləyir</option>
                                <option value="A">Anbarda</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Alış tarixi</label>
                            <input
                                type="date"
                                name="purchaseDate"
                                value={formData.purchaseDate}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="form_footer">
                        <button type="submit" className="save_btn">Yadda saxla</button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default NewPurchase;
