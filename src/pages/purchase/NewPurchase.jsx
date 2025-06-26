import React, { useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import "./css/purchase.css"
import { useNavigate } from 'react-router-dom';

const NewPurchase = () => {
    const [formData, setFormData] = useState({
        productName: '',
        articles: [''],
        quantity: '',
        costPrice: '',
        priceDollar: '',
        priceRub: '',
        salePrice: '',
        discountPrice: '',
        status: 'Gözləyir',
        purchaseDate: '03.11.2024'
    });

    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleArticleChange = (index, value) => {
        const newArticles = [...formData.articles];
        newArticles[index] = value;
        setFormData(prev => ({
            ...prev,
            articles: newArticles
        }));
    };

    const addArticle = () => {
        setFormData(prev => ({
            ...prev,
            articles: [...prev.articles, '']
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form məlumatları:", formData);
        // Burada API-yə göndərmə və ya digər əməliyyatlar yerinə yetirilə bilər
    };

    const returnPurchase=()=>{
        navigate("/purchase")
    }

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
                            <label>Məhsul adı</label>
                            <input
                                type="text"
                                name="productName"
                                placeholder="Məhsul adını daxil edin"
                                value={formData.productName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Artikl</label>
                            {formData.articles.map((art, index) => (
                                <div key={index} className="article_input">
                                    <input
                                        type="text"
                                        placeholder="Artikli daxil edin"
                                        value={art}
                                        onChange={(e) => handleArticleChange(index, e.target.value)}
                                    />
                                    {index === formData.articles.length - 1 && (
                                        <button type="button" onClick={addArticle}>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.5 8.49805H8.5V13.498C8.5 13.7633 8.39464 14.0176 8.20711 14.2052C8.01957 14.3927 7.76522 14.498 7.5 14.498C7.23478 14.498 6.98043 14.3927 6.79289 14.2052C6.60536 14.0176 6.5 13.7633 6.5 13.498V8.49805H1.5C1.23478 8.49805 0.98043 8.39269 0.792893 8.20515C0.605357 8.01762 0.5 7.76326 0.5 7.49805C0.5 7.23283 0.605357 6.97848 0.792893 6.79094C0.98043 6.6034 1.23478 6.49805 1.5 6.49805H6.5V1.49805C6.5 1.23283 6.60536 0.978476 6.79289 0.79094C6.98043 0.603403 7.23478 0.498047 7.5 0.498047C7.76522 0.498047 8.01957 0.603403 8.20711 0.79094C8.39464 0.978476 8.5 1.23283 8.5 1.49805V6.49805H13.5C13.7652 6.49805 14.0196 6.6034 14.2071 6.79094C14.3946 6.97848 14.5 7.23283 14.5 7.49805C14.5 7.76326 14.3946 8.01762 14.2071 8.20515C14.0196 8.39269 13.7652 8.49805 13.5 8.49805Z" fill="#202020" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
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
                            <label>Alış qiyməti ($)</label>
                            <input
                                type="text"
                                name="priceDollar"
                                placeholder="Alış qiymətini daxil edin"
                                value={formData.priceDollar}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Alış qiyməti (₽)</label>
                            <input
                                type="text"
                                name="priceRub"
                                placeholder="Alış qiymətini daxil edin"
                                value={formData.priceRub}
                                onChange={handleChange}
                            />
                        </div>

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
                                <option value="Gözləyir">Gözləyir</option>
                                <option value="Anbarda">Anbarda</option>
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
