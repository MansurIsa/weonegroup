import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "../../layouts/adminLayout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrandList, getCategoryList } from "../../actions/productsAction/productsAction";
import { getStockList } from "../../actions/stockActions/stockActions";
import { getUsersList } from "../../actions/loginAction/loginAction";
import { addSale } from "../../actions/salesAction/salesAction";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";

const SalesProductsSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stockList, count, next, previous } = useSelector((state) => state.stock);
  const { usersList, customerFactureList } = useSelector((state) => state.login);
  const { plusSalesObj } = useSelector(state => state.sales);

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [quantityValues, setQuantityValues] = useState({});
  const [priceValues, setPriceValues] = useState({});
  const [statusValues, setStatusValues] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const searchTimeout = useRef(null);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getBrandList());
    dispatch(getCategoryList());
    dispatch(getUsersList());
    fetchStock(1, "");
  }, [dispatch]);

  const fetchStock = (page = 1, search = "") => {
    dispatch(getStockList(page, search));
    setCurrentPage(page);
  };

  const handleStockSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      fetchStock(1, value);
    }, 500);
  };

  const toggleRow = (productId, product, stockAmount) => {
    const isSelected = selectedProductIds.includes(productId);

    if (isSelected) {
      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
      setQuantityValues((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
      setPriceValues((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
      setStatusValues((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    } else {
      setSelectedProductIds((prev) => [...prev, productId]);
      setQuantityValues((prev) => ({ ...prev, [productId]: 1 }));
      setPriceValues((prev) => ({ ...prev, [productId]: product?.price }));
      setStatusValues((prev) => ({ ...prev, [productId]: "G" }));
    }
  };

  const handleQuantityChange = (productId, value) => {
    const numericValue = value.replace(/^0+/, "");
    if (numericValue === "" || (!isNaN(numericValue) && +numericValue >= 0)) {
      setQuantityValues((prev) => ({ ...prev, [productId]: numericValue }));
    }
  };

  const handlePriceChange = (productId, value) => {
    const val = +value;
    if (val >= 0) setPriceValues((prev) => ({ ...prev, [productId]: val }));
  };

  const handleStatusChange = (productId, value) => {
    setStatusValues((prev) => ({ ...prev, [productId]: value }));
  };

  const handleDateChange = (e) => setSelectedDateTime(e.target.value);

  const handleSave = () => {
    if (!selectedCustomerId || !selectedDateTime) {
      toast.error("Zəhmət olmasa müştəri və satış tarixini təyin edin.");
      return;
    }

    let hasError = false;
    const invalidProducts = [];

    const selectedItems = selectedProductIds.map((productId) => {
      const stockItem = stockList.find((item) => item.product.id === productId);
      const product = stockItem?.product;
      const quantity = +quantityValues[productId] || 0;
      const status = statusValues[productId] || "G";
      const inStock = stockItem?.amount || 0;

      if (status === "S" && quantity > inStock) {
        hasError = true;
        invalidProducts.push({ name: product?.name, available: inStock });
      }

      return {
        product_id: productId,
        quantity,
        price: +priceValues[productId] || product?.price,
        status,
      };
    });

    if (hasError) {
      invalidProducts.forEach((p) =>
        toast.error(`Anbarda ${p.name} üçün yalnız ${p.available} ədəd mövcuddur.`)
      );
      return;
    }

    const basePayload = {
      customer: selectedCustomerId,
      products: selectedItems.map((p) => p.product_id),
      prices: selectedItems.map((p) => p.price),
      amounts: selectedItems.map((p) => p.quantity),
      datetimes: selectedItems.map(() => selectedDateTime),
      statuses: selectedItems.map((p) => p.status),
    };

    const payload = plusSalesObj?.id
      ? { salelist: plusSalesObj.id, ...basePayload }
      : basePayload;

    dispatch(addSale(payload, navigate));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    fetchStock(selectedPage, searchTerm);
  };

  const returnSales = () => navigate("/sales");

  useEffect(() => {
    if (
      plusSalesObj &&
      Object.keys(plusSalesObj).length > 0 &&
      customerFactureList?.salelist_sales?.length > 0
    ) {
      setSelectedCustomerId(customerFactureList.customer?.toString() || "");

      const firstDatetime = customerFactureList.salelist_sales[0]?.datetime;
      if (firstDatetime) {
        setSelectedDateTime(firstDatetime.slice(0, 16));
      }

      const productIds = customerFactureList.salelist_sales.map(s => s.product.id);

      const quantities = {};
      const prices = {};
      const statuses = {};

      customerFactureList.salelist_sales.forEach(s => {
        quantities[s.product.id] = s.amount;
        prices[s.product.id] = s.price;
        statuses[s.product.id] = s.status;
      });

      setSelectedProductIds(productIds);
      setQuantityValues(quantities);
      setPriceValues(prices);
      setStatusValues(statuses);
    }
  }, [plusSalesObj, customerFactureList]);

  useEffect(() => {
    if (selectedCustomerId && usersList.length > 0) {
      const exists = usersList.some(u => u.id.toString() === selectedCustomerId.toString());
      if (!exists) {
        dispatch(getUsersList(1, ""));
      }
    }
  }, [selectedCustomerId, usersList, dispatch]);

  return (
    <AdminLayout adminHeaderHide={true}>
      <div className="admin_container warehouse_page">
        <div className="return_btn">
          <button onClick={returnSales}>Geri dön</button>
        </div>

        <div className="left_box left_box_mb">
          {/* Müştəri inputu görünmür */}
          <input type="hidden" value={selectedCustomerId} />

          <div className="form_group form_group_sales_table_head">
            <label>Satış tarixi</label>
            <input
              type="datetime-local"
              value={selectedDateTime}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="admin_header_search project_container">
          <input
            type="text"
            placeholder="Axtar..."
            value={searchTerm}
            onChange={handleStockSearch}
          />
        </div>

        <div className="warehouse_table_wrapper">
          <table className="warehouse_table">
            <thead>
              <tr>
                <th className='number_table'></th>
                <th>Məhsul Adı</th>
                <th>Artikl</th>
                <th>Brend</th>
                <th>Qalan Say</th>
                <th>Maya Dəyəri</th>
                <th>Satış Qiyməti</th>
                <th>Endirimli Qiymət</th>
                <th>Miqdar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stockList?.map((item) => {
                const product = item.product;
                const productId = product.id;
                const isSelected = selectedProductIds.includes(productId);
                return (
                  <tr key={productId}>
                    <td className='number_table'>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(productId, product, item.amount)}
                      />
                    </td>
                    <td>{product?.name}</td>
                    <td>{product?.articles?.map((a) => a.name).join(", ")}</td>
                    <td>{product?.store?.name || "-"}</td>
                    <td>{item.amount}</td>
                    <td>{product?.cost_price} ₼</td>
                    <td>
                      {isSelected ? (
                        <input
                          type="number"
                          value={priceValues[productId] ?? product?.price}
                          onChange={(e) => handlePriceChange(productId, e.target.value)}
                          className="price_input"
                        />
                      ) : (
                        `${product?.price} ₼`
                      )}
                    </td>
                    <td>{product?.discount_price ?? "-"} ₼</td>
                    <td>
                      {isSelected && (
                        <input
                          type="number"
                          value={quantityValues[productId] ?? ""}
                          onChange={(e) => handleQuantityChange(productId, e.target.value)}
                          className={`quantity_input ${
                            statusValues[productId] === "S" &&
                            +quantityValues[productId] > item.amount
                              ? "input-error"
                              : ""
                          }`}
                        />
                      )}
                    </td>
                    <td>
                      {isSelected && (
                        <select
                          value={statusValues[productId] ?? "G"}
                          onChange={(e) => handleStatusChange(productId, e.target.value)}
                        >
                          <option value="G">Gözləyir</option>
                          <option value="S">Satılıb</option>
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {count > itemsPerPage && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={Math.ceil(count / itemsPerPage)}
              onPageChange={handlePageClick}
              containerClassName={"dashboard_end_pagination"}
              pageClassName={"dashboard_end_page"}
              pageLinkClassName={"dashboard_end_page_link"}
              previousClassName={"dashboard_end_arrow"}
              nextClassName={"dashboard_end_arrow"}
              activeClassName={"dashboard_end_active"}
            />
          )}

          <div className="warehouse_submit">
            <button className="save_btn" onClick={handleSave}>
              Yadda saxla
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SalesProductsSelect;
