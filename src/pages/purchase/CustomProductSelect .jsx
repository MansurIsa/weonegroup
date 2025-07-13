import React, { useState, useRef, useEffect } from 'react';


const CustomProductSelect = ({ products, value, onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const handleSelect = (product) => {
        onChange(product.id);
        setSearchTerm(product.name);
        setIsOpen(false);
    };

    console.log(products);
    

   const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.articles?.some(article =>
        article.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
);


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
        const selected = products.find(p => p.id === +value);
        if (selected) setSearchTerm(selected.name);
    }, [value]);

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
