import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../../actions/productsAction/productsAction";

const CustomProductSelect = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.products);

  // Seçilmiş məhsulun məlumatlarını yüklə
  useEffect(() => {
    if (value && productsList.length > 0) {
      const product = productsList.find(p => p.id === parseInt(value));
      if (product) {
        setSelectedProduct(product);
        if (!isTyping) {
          setSearchTerm(product.name);
        }
      }
    } else if (!value && !isTyping) {
      setSearchTerm("");
      setSelectedProduct(null);
    }
  }, [value, productsList, isTyping]);

  // Backend search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() && isTyping) {
        dispatch(getProductsList(1, searchTerm));
        setIsOpen(true);
      } else if (!searchTerm.trim()) {
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch, isTyping]);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (product) => {
    setSelectedProduct(product);
    onChange(product); // Bütün məhsul obyektini göndəririk
    setSearchTerm(product.name);
    setIsOpen(false);
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsTyping(true);
    
    if (newValue === "") {
      onChange(null);
      setSelectedProduct(null);
    }
    
    if (!selectedProduct || newValue !== selectedProduct.name) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (value && !searchTerm) {
      const product = productsList.find(p => p.id === parseInt(value));
      if (product) {
        setSearchTerm(product.name);
      }
    }
  };

  return (
    <div className="form_group custom-select-container" ref={dropdownRef}>
      <label>Məhsul</label>
      <input
        type="text"
        placeholder="Məhsul axtar..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />

      {isOpen && (
        <div className="custom-select-dropdown">
          {productsList.length > 0 ? (
            productsList.map((product) => (
              <div
                key={product.id}
                className={`custom-select-option ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                onClick={() => handleSelect(product)}
              >
                {product.name} ({product?.store?.name})
              </div>
            ))
          ) : (
            <div className="custom-select-option no-result">
              {searchTerm ? "Nəticə tapılmadı" : "Axtarış edin..."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomProductSelect;