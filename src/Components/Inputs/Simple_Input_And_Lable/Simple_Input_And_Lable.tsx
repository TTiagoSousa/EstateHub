import { useState, forwardRef } from 'react';
import './Simple_Input_And_Label.scss';
import * as Color from '../../../Styles/Colors';
import * as Icon from '../../../Imports/icons';

interface SimpleInputAndLabelProps {
  label_text?: string;
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'time' | 'datetime-local';
  disabled?: boolean;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  maxLength?: number;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  textAlign?: 'left' | 'center' | 'right';
}

const Simple_Input_And_Label = forwardRef<HTMLInputElement, SimpleInputAndLabelProps>(
  (
    {
      label_text,
      value,
      name,
      onChange,
      onBlur,
      placeholder,
      type = 'text',
      disabled = false,
      required = false,
      min,
      max,
      step,
      maxLength,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      size = 'medium',
      textAlign = 'center',
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div
        className={`Simple_Input_And_Label 
          ${error ? 'has_error' : ''} 
          ${disabled ? 'is_disabled' : ''} 
          ${isFocused ? 'is_focused' : ''}
          ${icon ? `has_icon_${iconPosition}` : ''}
          size_${size}
        `}
      >
        {/* Label */}
        {label_text && (
          <label>
            {label_text}
            {required && <span className="required">*</span>}
          </label>
        )}

        {/* Input Wrapper */}
        <div className="Input_Wrapper">
          {/* Icon Left */}
          {icon && iconPosition === 'left' && (
            <div className="Input_Icon Icon_Left">{icon}</div>
          )}

          {/* Input */}
          <input
            ref={ref}
            name={name}
            type={showPassword ? 'text' : type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
            step={step}
            maxLength={maxLength}
            style={{ textAlign }}
          />

          {/* Password Toggle Icon */}
          {type === 'password' && (
            <div className="Input_Icon Icon_Password" onClick={toggleShowPassword}>
              {showPassword ? (
                <Icon.Close_Eye GlobalColor={Color.blue} />
              ) : (
                <Icon.Open_Eye GlobalColor={Color.blue} />
              )}
            </div>
          )}

          {/* Icon Right (não aparece se for password) */}
          {icon && iconPosition === 'right' && type !== 'password' && (
            <div className="Input_Icon Icon_Right">{icon}</div>
          )}
        </div>

        {/* Error Message */}
        {error && <span className="Error_Message">{error}</span>}

        {/* Helper Text */}
        {!error && helperText && <span className="Helper_Text">{helperText}</span>}
      </div>
    );
  }
);

Simple_Input_And_Label.displayName = 'Simple_Input_And_Label';

export default Simple_Input_And_Label;