import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { getBrandList, getCategoryList } from '../../actions/productsAction/productsAction';
import { getStockList } from '../../actions/stockActions/stockActions';
import { useDispatch, useSelector } from 'react-redux';
import { addSale } from '../../actions/salesAction/salesAction';
import toast from 'react-hot-toast';

const SalesProductsSelect = () => {
    const [search, setSearch] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [quantityValues, setQuantityValues] = useState({});
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceValues, setPriceValues] = useState({});
    const [invalidRows, setInvalidRows] = useState([]);


    const handlePriceChange = (index, value) => {
        setPriceValues({ ...priceValues, [index]: value });
    };





    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categoryList, brandList } = useSelector(state => state.products);
    const { stockList } = useSelector(state => state.stock);
    const { customerId, saleDate } = useSelector(state => state.sales);

    console.log(customerId,saleDate);
    

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

    const handleQuantityChange = (index, value, max) => {
    const parsedValue = +value;

    if (parsedValue <= max) {
        setQuantityValues({ ...quantityValues, [index]: value });

        if (parsedValue <= 0) {
            setInvalidRows(prev => [...new Set([...prev, index])]);
        } else {
            setInvalidRows(prev => prev.filter(i => i !== index));
        }
    }
};



    const totalCost = filtered.reduce((acc, item) => acc + item.amount * item.product?.cost_price, 0);
    const totalProfit = filtered.reduce((acc, item) => acc + item.amount * (item.product?.price - item.product?.cost_price), 0);

const handleSave = () => {
    if (!customerId || !saleDate) {
        toast.error("Zəhmət olmasa müştəri və satış tarixini seçin.");
        return;
    }

    const selectedItems = selectedRows.map(index => {
        const product = filtered[index].product;
        return {
            product_id: product.id,
            quantity: +quantityValues[index] || 0,
            price: +priceValues[index] || product.price
        };
    });

    // ✅ Miqdar yoxlaması burada
    if (selectedItems.some(item => item.quantity <= 0)) {
        toast.error("Bütün seçilmiş məhsullar üçün miqdar 0-dan çox olmalıdır.");
        return;
    }

    const payload = {
        customer: customerId,
        products: selectedItems.map(item => item.product_id),
        prices: selectedItems.map(item => item.price),
        amounts: selectedItems.map(item => item.quantity),
        datetimes: selectedItems.map(() => saleDate)
    };

    console.log("Yadda saxlanan məlumat:", payload);
    dispatch(addSale(payload, navigate));
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

                                        <td>
                                            {selectedRows.includes(index) ? (
                                                <input
                                                    type="number"
                                                    value={priceValues[index] ?? item.product?.price}
                                                    onChange={(e) => handlePriceChange(index, e.target.value)}
                                                    className="price_input"
                                                />
                                            ) : (
                                                `${item.product?.price} ₼`
                                            )}
                                        </td>

                                        <td>{item.product?.discount_price} ₼</td>
                                       <td>
  {selectedRows.includes(index) && (
    <div>
      <input
        type="number"
        placeholder="0"
        className={`quantity_input ${invalidRows.includes(index) ? 'input_error' : ''}`}
        value={quantityValues[index] || ''}
        onChange={(e) => handleQuantityChange(index, e.target.value, item.amount)}
      />
      {invalidRows.includes(index) && (
        <p className="input_error_text">Miqdar 0-dan çox olmalıdır</p>
      )}
    </div>
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
