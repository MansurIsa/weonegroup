import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { getBrandList, getCategoryList } from '../../actions/productsAction/productsAction';
import { getStockList } from '../../actions/stockActions/stockActions';
import { useDispatch, useSelector } from 'react-redux';

const SalesProductsSelect = () => {
    const [search, setSearch] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [quantityValues, setQuantityValues] = useState({});
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoryList, brandList } = useSelector(state => state.products);
    const { stockList } = useSelector(state => state.stock);

    useEffect(() => {
        dispatch(getBrandList());
        dispatch(getCategoryList());
        dispatch(getStockList());
    }, [dispatch]);

    const returnSales = () => {
        navigate("/sales");
    };

    const filtered = stockList?.filter(p =>
        (!selectedBrand || p.product?.brand?.id === +selectedBrand) &&
        (!selectedCategory || p.product?.category?.id === +selectedCategory) &&
        (
            p.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.product?.articles?.some(a => a.name.toLowerCase().includes(search.toLowerCase()))
        )
    ) || [];

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

    const totalCost = filtered.reduce((acc, item) => acc + item.amount * item.product?.cost_price, 0);
    const totalProfit = filtered.reduce((acc, item) => acc + item.amount * (item.product?.price - item.product?.cost_price), 0);

    const handleSave = () => {
        const item_ids = selectedRows.map(index => filtered[index].product.id);
        console.log("Seçilmiş məhsul ID-ləri:", item_ids);

        // Burada backendə göndərilə bilər:
        // axios.post('/api/sales-products/', { item_ids })
    };

    return (
        <AdminLayout adminHeaderHide={true}>
            <div className="admin_container warehouse_page">
                <div className="return_btn">
                    <button onClick={returnSales}>Geri dön</button>
                </div>

                <div className="warehouse_content">
                    <div className="warehouse_sidebar">
                        <input
                            type="text"
                            placeholder="Axtar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                            <option value="">Bütün Markalar</option>
                            {brandList?.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>

                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">Bütün Kateqoriyalar</option>
                            {categoryList?.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
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
                                        <td>{item.product?.name}</td>
                                        <td>{item.product?.articles?.map(a => a.name).join(', ')}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.product?.cost_price} ₼</td>
                                        <td>{item.product?.price} ₼</td>
                                        <td>{item.product?.discount_price} ₼</td>
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
                                <span>{totalCost.toFixed(2)} AZN</span>
                            </div>
                            <div>
                                <label>Satışdan əldə olunan qazanc</label>
                                <span>{totalProfit.toFixed(2)} AZN</span>
                            </div>
                        </div>

                        <div className="warehouse_submit">
                            <button className="save_btn" onClick={handleSave}>Yadda saxla</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SalesProductsSelect;
