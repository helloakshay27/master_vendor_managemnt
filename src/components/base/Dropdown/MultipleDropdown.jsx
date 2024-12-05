import React, { useState } from 'react'

export default function MultipleDropdown({menuItems,children}) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownToggle = (dropdownName) => {
      setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };
  
    return (
      <div className="dropdown-container">
        {children}
        <div className="dropdown">
          {menuItems.map((item) => (
            <div key={item.label} className="dropdown-item-container">
              <button
                className="dropdown-item"
                onClick={() =>
                  item.subItems ? handleDropdownToggle(item.label) : null
                }
              >
                {item.label} {item.subItems && '>'}
              </button>
              {openDropdown === item.label && item.subItems && (
                <div className="sub-dropdown">
                  {item.subItems.map((subItem) => (
                    <button key={subItem} className="dropdown-item">
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };