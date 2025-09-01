import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsList } from '../../actions/productsAction/productsAction';

const CustomProductSelect = ({ value, onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    const { productsList } = useSelector(state => state.products);

    // input dəyişdikcə backend-dən sorğu
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch(getProductsList(1, searchTerm)); // page 1, search term
        }, 300); // 300ms gecikmə

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, dispatch]);

    const handleSelect = (product) => {
        onChange(product.id);
        setSearchTerm(product.name);
        setIsOpen(false);
    };

    const filtered = productsList; // artıq backend search nəticəsini göstərir

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const selected = productsList.find(p => p.id === +value);
        if (selected) setSearchTerm(selected.name);
    }, [value, productsList]);

    return (
        <div className="form_group custom-select-container" ref={dropdownRef}>
            <label>Məhsul</label>
            <input
                type="text"
                placeholder="Məhsul axtar..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <div className="custom-select-dropdown">
                    {filtered.length > 0 ? (
                        filtered.map((product) => (
                            <div
                                key={product.id}
                                className="custom-select-option"
                                onClick={() => handleSelect(product)}
                            >
                                {product.name}
                            </div>
                        ))
                    ) : (
                        <div className="custom-select-option no-result">Nəticə tapılmadı</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomProductSelect;
