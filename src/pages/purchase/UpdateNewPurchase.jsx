import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import './css/purchase.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandList, getCategoryList, getProductsList } from '../../actions/productsAction/productsAction';
import { addPurchase, updatePurchase } from '../../actions/purchaseAction/purchaseAction';
import { getSupplierList } from '../../actions/loginAction/loginAction';
import CustomProductSelect from './CustomProductSelect ';
import CustomSupplierSelect from './CustomSupplierSelect';

const UpdateNewPurchase = () => {
    const [formData, setFormData] = useState({
        brand: '',
        category: '',
        productId: '',
        supplierId: '',
        quantity: '',
        costPrice: '',
        purchaseCurrency: '',
        purchasePriceValue: '',
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
        dispatch(getSupplierList());
    }, [dispatch]);

    const { productsList, categoryList, brandList } = useSelector(state => state.products);
    const { supplierList } = useSelector(state => state.login);
    const { updatePurchaseObj } = useSelector(state => state.purchase);

    useEffect(() => {
        if (updatePurchaseObj) {
            setFormData({
                brand: updatePurchaseObj.product?.brand?.id || '',
                category: updatePurchaseObj.product?.category?.id || '',
                productId: updatePurchaseObj.product?.id || '',
                supplierId: updatePurchaseObj.supplier || '',
                quantity: updatePurchaseObj.amount || '',
                costPrice: updatePurchaseObj.product?.cost_price || '',
                purchaseCurrency: updatePurchaseObj.product?.currency || '',
                purchasePriceValue: updatePurchaseObj.product?.purchase_price || '',
                salePrice: updatePurchaseObj.product?.price || '',
                discountPrice: updatePurchaseObj.product?.discount_price || '',
                status: updatePurchaseObj.status || 'G',
                purchaseDate: updatePurchaseObj.date || ''
            });
        }
    }, [updatePurchaseObj]);

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
            supplier: formData.supplierId ? +formData.supplierId : null,
            amount: +formData.quantity,
            date: formData.purchaseDate,
            status: formData.status,
            cost_price: parseFloat(formData.costPrice),
            purchase_price: parseFloat(formData.purchasePriceValue),
            currency: formData.purchaseCurrency,
            price: parseFloat(formData.salePrice),
            discount_price: parseFloat(formData.discountPrice),
        };

        dispatch(updatePurchase(payload,updatePurchaseObj?.id, navigate));
        console.log(payload);
        
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

                <h2>Cari Alışda dəyişiklik et</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form_grid">
                        <CustomProductSelect
                            products={filteredProducts}
                            value={formData.productId}
                            onChange={(id) => setFormData(prev => ({ ...prev, productId: id }))}
                        />

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

                        <CustomSupplierSelect
                            suppliers={supplierList}
                            value={formData.supplierId}
                            onChange={(id) => setFormData(prev => ({ ...prev, supplierId: id }))}
                        />

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
                                <option value="M">₼ AZN</option>
                                <option value="D">$ USD</option>
                                <option value="R">₽ RUB</option>
                            </select>
                        </div>

                        {formData.purchaseCurrency && (
                            <div className="form_group">
                                <label>
                                    Alış qiyməti ({
                                        formData.purchaseCurrency === 'M' ? '₼' :
                                        formData.purchaseCurrency === 'D' ? '$' :
                                        formData.purchaseCurrency === 'R' ? '₽' : ''
                                    })
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

export default UpdateNewPurchase;
