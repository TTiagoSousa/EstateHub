import { useState, forwardRef } from 'react';
import './Simple_Textarea_And_Label.scss';

interface SimpleTextareaAndLabelProps {
  label_text?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  rows?: number;
  maxLength?: number;
  size?: 'small' | 'medium' | 'large';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  showCharCount?: boolean;
}

const Simple_Textarea_And_Label = forwardRef<HTMLTextAreaElement, SimpleTextareaAndLabelProps>(
  (
    {
      label_text,
      value = '',
      name,
      onChange,
      onBlur,
      placeholder = 'Escreva aqui...',
      disabled = false,
      required = false,
      error,
      helperText,
      rows = 4,
      maxLength,
      size = 'medium',
      resize = 'vertical',
      showCharCount = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const charCount = value?.length || 0;
    const showCount = showCharCount || maxLength;

    const containerClasses = [
      'Simple_Textarea_And_Label',
      error ? 'has_error' : '',
      disabled ? 'is_disabled' : '',
      isFocused ? 'is_focused' : '',
      `size_${size}`,
      `resize_${resize}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label_text && (
          <label>
            {label_text}
            {required && <span className="required">*</span>}
          </label>
        )}

        {/* Textarea Wrapper */}
        <div className="textarea_wrapper">
          {/* Textarea */}
          <textarea
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            maxLength={maxLength}
          />
        </div>

        {/* Character Count / Helper / Error */}
        {(error || helperText || showCount) && (
          <div className="textarea_footer">
            <div className="footer_left">
              {/* Error Message */}
              {error && <span className="error_message">{error}</span>}

              {/* Helper Text */}
              {!error && helperText && <span className="helper_text">{helperText}</span>}
            </div>

            {/* Character Count */}
            {showCount && (
              <div className="footer_right">
                <span className="char_count">
                  {charCount}
                  {maxLength && ` / ${maxLength}`}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Simple_Textarea_And_Label.displayName = 'Simple_Textarea_And_Label';

export default Simple_Textarea_And_Label;