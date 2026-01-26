import React, { useState, useEffect, useRef, forwardRef } from 'react';
import './Simple_Selector_And_Label.scss';

interface SelectorOption {
  value: string | number;
  label: string;
}

interface SimpleSelectorAndLabelProps {
  label_text?: string;
  options: SelectorOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  name?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const Simple_Selector_And_Label = forwardRef<HTMLDivElement, SimpleSelectorAndLabelProps>(
  (
    {
      label_text,
      options = [],
      value,
      onChange,
      placeholder = 'Selecione uma opção',
      disabled = false,
      required = false,
      error,
      helperText,
      size = 'medium',
      name,
      textAlign = 'center',
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value);

    const handleInputClick = () => {
      if (!disabled) {
        setOpen(true);
        setIsFocused(true);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setOpen(true);
      setIsFocused(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setOpen(false);
        setIsFocused(false);
        setSearchQuery('');
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleOptionClick = (option: SelectorOption) => {
      onChange?.(option.value);
      setOpen(false);
      setIsFocused(false);
      setSearchQuery('');
    };

    // Filtrar sempre que houver pesquisa
    const filteredOptions = searchQuery
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

    const containerClasses = [
      'Simple_Selector_And_Label',
      error ? 'has_error' : '',
      disabled ? 'is_disabled' : '',
      isFocused ? 'is_focused' : '',
      open ? 'is_open' : '',
      `size_${size}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses} ref={selectorRef}>
        {/* Label */}
        {label_text && (
          <label>
            {label_text}
            {required && <span className="required">*</span>}
          </label>
        )}

        {/* Selector Wrapper */}
        <div className="selector_wrapper">
          {/* Input Display - Sempre editável */}
          <input
            type="text"
            value={searchQuery || (selectedOption ? selectedOption.label : '')}
            onChange={handleInputChange}
            onClick={handleInputClick}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            style={{ textAlign }}
          />

          {/* Dropdown Arrow */}
          <div className="selector_arrow" onClick={handleInputClick}>
            <span className={open ? 'arrow_up' : 'arrow_down'}>▼</span>
          </div>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="Dropdown">
            <ul>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className={option.value === value ? 'selected' : ''}
                  >
                    {option.label}
                    {option.value === value && <span className="check_icon">✓</span>}
                  </li>
                ))
              ) : (
                <li className="no_results">Nenhum resultado encontrado</li>
              )}
            </ul>
          </div>
        )}

        {/* Error Message */}
        {error && <span className="error_message">{error}</span>}

        {/* Helper Text */}
        {!error && helperText && <span className="helper_text">{helperText}</span>}
      </div>
    );
  }
);

Simple_Selector_And_Label.displayName = 'Simple_Selector_And_Label';

export default Simple_Selector_And_Label;