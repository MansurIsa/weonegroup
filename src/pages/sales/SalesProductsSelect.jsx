import React, { useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const productData = [
    {
        brand: 'Castrol',
        name: 'Lada yağı',
        article: ['504', '504A'],
        stock: 1000,
        cost: 12,
        sale: 17,
        discount: 15
    },
    {
        brand: 'Opel',
        name: 'Mühərrik yağı',
        article: ['001'],
        stock: 1000,
        cost: 12,
        sale: 17,
        discount: 15
    },
    {
        brand: 'Hyundai',
        name: 'Radiator',
        article: ['102', '102B'],
        stock: 1000,
        cost: 12,
        sale: 17,
        discount: 15
    },
    {
        brand: 'Toyoto',
        name: 'Əyləc diski',
        article: ['066'],
        stock: 1000,
        cost: 12,
        sale: 17,
        discount: 15
    },
    {
        brand: 'BMW',
        name: 'Mühərrik yağı',
        article: ['002', '002C'],
        stock: 1000,
        cost: 12,
        sale: 17,
        discount: 15
    },
    {
        brand: 'Hyundai',
        name: 'Radiator',
        article: ['103'],
        stock: 1000,
        cost: 12,
        sale: 17,
        discount: 15
    },
    {
        brand: 'Toyoto',
        name: 'Əyləc diski',
        article: ['105'],
        stock: 1000,
        cost: 12,
        sale: 17,
        discount: 15
    },
    {
        brand: 'Opel',
        name: 'Mühərrik yağı',
        article: ['010'],
        stock: 1000,
        cost: 12,
        sale: 17,
        discount: 15
    }
];

const SalesProductsSelect = () => {
    const [search, setSearch] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [quantityValues, setQuantityValues] = useState({});

    const filtered = productData.filter(p =>
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleRow = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const handleQuantityChange = (index, value) => {
        setQuantityValues({ ...quantityValues, [index]: value });
    };

    const totalCost = filtered.reduce((acc, item) => acc + item.stock * item.cost, 0);
    const totalProfit = filtered.reduce((acc, item) => acc + item.stock * (item.sale - item.cost), 0);


    const navigate=useNavigate()

    const returnSales = () => {
        navigate("/sales")
    }
    return (
        <AdminLayout adminHeaderHide={true}>

            <div className="admin_container warehouse_page">
                <div className="return_btn">
                    <button onClick={returnSales}>Geri dön</button>
                </div>
                <div className="warehouse_search">
                    <input
                        type="text"
                        placeholder="Axtar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="warehouse_content">
                    <div className="warehouse_sidebar">
                        <strong>Markalar</strong>
                        {[...new Set(productData.map(p => p.brand))].map((brand, idx) => (
                            <div key={idx} className="sidebar_brand">{brand}</div>
                        ))}
                    </div>

                    <div className="warehouse_table_wrapper">
                        <table className="warehouse_table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Məhsul Adı</th>
                                    <th>Artikl</th>
                                    <th>Qalan Say</th>
                                    <th>Maya Dəyəri</th>
                                    <th>Satış Qiyməti</th>
                                    <th>Endirimli Qiymət</th>
                                    <th>Miqdar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(index)}
                                                onChange={() => toggleRow(index)}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.article.join(', ')}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.cost} ₼</td>
                                        <td>{item.sale} ₼</td>
                                        <td>{item.discount} ₼</td>
                                        <td>
                                            {selectedRows.includes(index) && (
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="quantity_input"
                                                    value={quantityValues[index] || ''}
                                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="warehouse_summary">
                            <div>
                                <label>Ümumi məbləğ</label>
                                <span>{totalCost} AZN</span>
                            </div>
                            <div>
                                <label>Satışdan əldə olunan qazanc</label>
                                <span>{totalProfit} AZN</span>
                            </div>
                        </div>

                        <div className="warehouse_submit">
                            <button className="save_btn">Yadda saxla</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};


export default SalesProductsSelect;
