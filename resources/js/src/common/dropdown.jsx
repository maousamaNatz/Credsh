import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  trigger,
  children,
  align = 'left',
  className = '',
  width = 'w-56',
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`absolute mt-2 z-50 ${alignmentClasses[align]} ${width} bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5`}>
          {children}
        </div>
      )}
    </div>
  );
};

// Komponen tambahan untuk memudahkan penggunaan
export const DropdownItem = ({ children, onClick, className = '', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export const DropdownDivider = () => (
  <hr className="my-1 border-gray-200" />
);

export const DropdownHeader = ({ children, className = '' }) => (
  <div className={`px-4 py-2 text-xs font-semibold text-gray-500 uppercase ${className}`}>
    {children}
  </div>
);

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  className: PropTypes.string,
  width: PropTypes.string,
  onClose: PropTypes.func
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

DropdownHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Dropdown;
