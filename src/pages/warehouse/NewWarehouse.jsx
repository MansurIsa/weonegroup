import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import './css/warehouse.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandList, getCategoryList, getProductsList } from '../../actions/productsAction/productsAction';
import { getPurchaseList } from '../../actions/purchaseAction/purchaseAction';
import { addStock } from '../../actions/stockActions/stockActions';

const NewWarehouse = () => {
    const [search, setSearch] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoryList, brandList } = useSelector(state => state.products);
    const { purchaseList } = useSelector(state => state.purchase);

    useEffect(() => {
        dispatch(getBrandList());
        dispatch(getCategoryList());
        dispatch(getProductsList());
        dispatch(getPurchaseList());
    }, [dispatch]);

    const returnWarehouse = () => {
        navigate("/warehouse");
    };
    console.log(purchaseList);

    // 🔍 Filtrlənmiş və statusu G olan məhsullar
    const filtered = purchaseList.filter(p =>
        p.status === "G" &&
        (!selectedBrand || p.product?.brand?.id === +selectedBrand) &&
        (!selectedCategory || p.product?.category?.id === +selectedCategory) &&
        (
            p.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.product?.articles?.some(article => article.name.toLowerCase().includes(search.toLowerCase()))
        )
    );

    const toggleRow = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const totalCost = filtered.reduce((acc, item) => acc + item.amount * item.product.cost_price, 0);
    const totalProfit = filtered.reduce((acc, item) => acc + item.amount * (item.product?.price - item?.product?.cost_price), 0);


    const handleSave = () => {
        const selectedItemIds = filtered
            .map((item, index) => selectedRows.includes(index) ? item.id : null)
            .filter(id => id !== null);

        const payload = {
            item_ids: selectedItemIds
        };

        console.log("Göndərilən məhsul ID-ləri:", payload);
        dispatch(addStock(payload,navigate))

        // Burada dispatch və ya API call edə bilərsən:
        // dispatch(sendSelectedItemsToBackend(payload));
    };

    return (
        <AdminLayout adminHeaderHide={true}>
            <div className="admin_container warehouse_page">
                <div className="return_btn">
                    <button onClick={returnWarehouse}>Geri dön</button>
                </div>

                {/* <div className="warehouse_search_filters">
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
                </div> */}

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
                                    <th>Alış Qiyməti</th>
                                    <th>Satış Qiyməti</th>
                                    <th>Endirimli Qiymət</th>
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
                                        <td className='table_article_scroll'>{item.product?.articles?.map(a => a.name).join(', ')}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.product?.cost_price} ₼</td>
                                        <td>{item.product?.purchase_price} ₼</td>
                                        <td>{item.product?.price} ₼</td>
                                        <td>{item.product?.discount_price} ₼</td>
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

export default NewWarehouse;
