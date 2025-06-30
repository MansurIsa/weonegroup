import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import "./css/newCustomer.css"

const NewCustomer = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        address: '',
        email: '',
        phone: '',
        website: '',
        priceType: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (type) => {
        setFormData(prev => ({
            ...prev,
            priceType: prev.priceType === type ? '' : type
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form məlumatları:', formData);
        // buraya API göndərişi yazıla bilər
    };

    const handleReturn = () => {
        navigate('/customers');
    };

    return (
        <AdminLayout adminHeaderHide={true}>
            <div className="admin_container new_purchase_form">
                <div className="return_btn">
                    <button onClick={handleReturn}>Geri dön</button>
                </div>

                <h2>Yeni müştəri əlavə et</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form_grid">
                        <div className="form_group">
                            <label>Adı</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Adını daxil edin"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Soyadı</label>
                            <input
                                type="text"
                                name="surname"
                                placeholder="Soyadını daxil edin"
                                value={formData.surname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Ünvan</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Ünvanı daxil edin"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Əlaqə nömrəsi</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Əlaqə nömrəsini daxil edin"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Elektron poçt</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Elektron poçtunuzu daxil edin"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group">
                            <label>Vebsayt (vacib deyil)</label>
                            <input
                                type="text"
                                name="website"
                                placeholder="Vebsaytın linkini daxil edin"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form_group new_customer_form_group">
                            <label>Ödəniş statusu</label>
                            <div className="checkbox_group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.priceType === 'normal'}
                                        onChange={() => handleCheckboxChange('normal')}
                                    />
                                    Satış qiymət
                                </label>
                                <label style={{ marginLeft: '20px' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.priceType === 'discount'}
                                        onChange={() => handleCheckboxChange('discount')}
                                    />
                                    Endirimli qiymət
                                </label>
                            </div>
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

export default NewCustomer;
