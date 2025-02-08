import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  trigger,
  items,
  align = 'left',
  className = '',
  onSelect,
  type = 'default', // 'default', 'profile', 'big', 'multi'
  subItems
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    if (!item.subItems) {
      onSelect?.(item);
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuClick = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  const getDropdownClasses = () => {
    switch(type) {
      case 'profile':
        return 'w-64 bg-white rounded-lg shadow-xl border border-gray-200';
      case 'big':
        return 'w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4';
      case 'multi':
        return 'w-72 bg-white rounded-lg shadow-xl border border-gray-200';
      default:
        return 'w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5';
    }
  };

  const renderDropdownItems = (items) => {
    return items.map((item, index) => {
      if (item.type === 'profile') {
        return (
          <div key={index} className="px-4 py-3">
            <p className="text-sm">{item.name}</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {item.email}
            </p>
          </div>
        );
      }

      if (item.type === 'divider') {
        return <hr key={index} className="border-gray-200" />;
      }

      return (
        <a
          key={index}
          href={item.href}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={item.onClick}
        >
          {item.label}
        </a>
      );
    });
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`absolute mt-2 z-50 ${alignmentClasses[align]} ${getDropdownClasses()}`}>
          {renderDropdownItems(items)}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
      subItems: PropTypes.array
    })),
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string
    })
  ]).isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  className: PropTypes.string,
  onSelect: PropTypes.func,
  type: PropTypes.oneOf(['default', 'profile', 'big', 'multi'])
};

export default Dropdown;
