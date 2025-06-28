import React, { useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import "./css/products.css"

const NewProducts = () => {
    const [formData, setFormData] = useState({
        productName: '',
        articles: [''],
        quantity: '',
        costPrice: '',
        priceDollar: '',
        priceRub: '',
        salePrice: '',
        discountPrice: '',
        status: 'Gözləyir'
    });

    const [productImage, setProductImage] = useState(null);
    const navigate = useNavigate();

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('productName', formData.productName);
        formData.articles.forEach((art, i) => {
            form.append(`articles[${i}]`, art);
        });
        form.append('quantity', formData.quantity);
        form.append('costPrice', formData.costPrice);
        form.append('priceDollar', formData.priceDollar);
        form.append('priceRub', formData.priceRub);
        form.append('salePrice', formData.salePrice);
        form.append('discountPrice', formData.discountPrice);
        form.append('status', formData.status);
        if (productImage) {
            form.append('productImage', productImage);
        }

        console.log("Form məlumatları:", formData);
        // API çağırışı buraya yazıla bilər
    };

    const returnToProducts = () => {
        navigate("/products-table");
    };

    return (
        <AdminLayout adminHeaderHide={true}>
            <div className="admin_container new_purchase_form">
                <div className="return_btn">
                    <button onClick={returnToProducts}>Geri dön</button>
                </div>

                <h2>Yeni məhsul əlavə et</h2>
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
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                <path d="M13.5 8.5H8.5V13.5C8.5 13.8 8.4 14 8.2 14.2C8 14.4 7.8 14.5 7.5 14.5C7.2 14.5 7 14.4 6.8 14.2C6.6 14 6.5 13.8 6.5 13.5V8.5H1.5C1.2 8.5 1 8.4 0.8 8.2C0.6 8 0.5 7.8 0.5 7.5C0.5 7.2 0.6 7 0.8 6.8C1 6.6 1.2 6.5 1.5 6.5H6.5V1.5C6.5 1.2 6.6 1 6.8 0.8C7 0.6 7.2 0.5 7.5 0.5C7.8 0.5 8 0.6 8.2 0.8C8.4 1 8.5 1.2 8.5 1.5V6.5H13.5C13.8 6.5 14 6.6 14.2 6.8C14.4 7 14.5 7.2 14.5 7.5C14.5 7.8 14.4 8 14.2 8.2C14 8.4 13.8 8.5 13.5 8.5Z" fill="#202020" />
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
                            <label>Məhsulun şəkli</label>
                            <label className="custom_file_input">
                                <span>Məhsulun şəkli əlavə et</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    hidden
                                />
                                <span className="plus_icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C17.5139 2 22 6.48614 22 12C22 17.5139 17.5139 22 12 22C6.48614 22 2 17.5139 2 12C2 6.48614 6.48614 2 12 2ZM12 2.5C6.75886 2.5 2.5 6.75886 2.5 12C2.5 17.2411 6.75886 21.5 12 21.5C17.2411 21.5 21.5 17.2411 21.5 12C21.5 6.75886 17.2411 2.5 12 2.5Z" fill="#32312F" stroke="#32312F" />
                                        <path d="M12 7.25C12.1439 7.25 12.25 7.35614 12.25 7.5V16.5C12.25 16.6439 12.1439 16.75 12 16.75C11.8561 16.75 11.75 16.6439 11.75 16.5V7.5C11.75 7.35614 11.8561 7.25 12 7.25Z" fill="#32312F" stroke="#32312F" />
                                        <path d="M7.5 11.75H16.5C16.6439 11.75 16.75 11.8561 16.75 12C16.75 12.1439 16.6439 12.25 16.5 12.25H7.5C7.35614 12.25 7.25 12.1439 7.25 12C7.25 11.8561 7.35614 11.75 7.5 11.75Z" fill="#32312F" stroke="#32312F" />
                                    </svg>
                                </span>
                            </label>
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

export default NewProducts;
