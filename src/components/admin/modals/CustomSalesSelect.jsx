import React, { useState, useEffect, useRef } from 'react';

const CustomSalesSelect = ({ sales, value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedSale = sales.find(s => s.id === +value);

  const handleSelect = (sale) => {
    onChange(sale.id.toString());
    setSearchTerm(`${sale.customer.first_name} ${sale.customer.last_name} — ${sale.product.name}`);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedSale) {
      setSearchTerm(`${selectedSale.customer.first_name} ${selectedSale.customer.last_name} — ${selectedSale.product.name}`);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSales = sales.filter(s =>
    (`${s.customer.first_name} ${s.customer.last_name} ${s.product.name}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="form_group custom-select-container" ref={containerRef}>
      <label>Satış seçin</label>
      <input
        type="text"
        placeholder="Satış axtar..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="custom-select-dropdown">
          {filteredSales.length > 0 ? (
            filteredSales.map((sale) => (
              <div
                key={sale.id}
                className="custom-select-option"
                onClick={() => handleSelect(sale)}
              >
                {sale.customer.first_name} {sale.customer.last_name} — {sale.product.name}
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

export default CustomSalesSelect;
