import React, { useState, useEffect, useRef, forwardRef } from 'react';
import './Simple_Selector_And_Label.scss';

interface SelectorOption {
  value: string | number;
  label: string;
}

interface SimpleSelectorAndLabelProps {
  options: SelectorOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  showInfo?: boolean;
  infoText?: string;
}

const TOOLTIP_WIDTH = 200;
const TOOLTIP_ESTIMATED_HEIGHT = 50;
const GAP = 10;
const PADDING = 8;

type TooltipPlacement = 'right' | 'left' | 'bottom';

interface TooltipState {
  top: number;
  left: number;
  placement: TooltipPlacement;
  arrowOffset: number;
}

const Simple_Selector_And_Label = forwardRef<HTMLDivElement, SimpleSelectorAndLabelProps>(
  ({ options = [], value, onChange, placeholder = 'Selecione uma opção', disabled = false, name, showInfo = false, infoText }, ref) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tooltip, setTooltip] = useState<TooltipState | null>(null);
    const selectorRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Fecha ao clicar fora
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
          setOpen(false);
          setSearchQuery('');
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
      if (!disabled) setOpen((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setOpen(true);
    };

    const handleOptionClick = (option: SelectorOption) => {
      onChange?.(option.value);
      setOpen(false);
      setSearchQuery('');
    };

    const filteredOptions = searchQuery
      ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

    // Tooltip smart placement (mesmo algoritmo do Input)
    const handleInfoEnter = () => {
      if (!infoRef.current || !infoText) return;
      const r = infoRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const btnCenterX = r.left + r.width / 2;
      const btnCenterY = r.top + r.height / 2;

      if (r.right + GAP + TOOLTIP_WIDTH <= vw - PADDING) {
        const left = r.right + GAP;
        let top = btnCenterY - TOOLTIP_ESTIMATED_HEIGHT / 2;
        top = Math.max(PADDING, Math.min(top, vh - TOOLTIP_ESTIMATED_HEIGHT - PADDING));
        return setTooltip({ top, left, placement: 'right', arrowOffset: btnCenterY - top });
      }
      if (r.left - GAP - TOOLTIP_WIDTH >= PADDING) {
        const left = r.left - GAP - TOOLTIP_WIDTH;
        let top = btnCenterY - TOOLTIP_ESTIMATED_HEIGHT / 2;
        top = Math.max(PADDING, Math.min(top, vh - TOOLTIP_ESTIMATED_HEIGHT - PADDING));
        return setTooltip({ top, left, placement: 'left', arrowOffset: btnCenterY - top });
      }
      const top = r.bottom + GAP;
      let left = btnCenterX - TOOLTIP_WIDTH / 2;
      left = Math.max(PADDING, Math.min(left, vw - TOOLTIP_WIDTH - PADDING));
      setTooltip({ top, left, placement: 'bottom', arrowOffset: btnCenterX - left });
    };

    const handleInfoLeave = () => setTooltip(null);

    const arrowStyle = tooltip
      ? ({ '--arrow-pos': `${tooltip.arrowOffset}px` } as React.CSSProperties)
      : {};

    return (
      <div
        className={`Global_Selector${open ? ' is_open' : ''}${disabled ? ' is_disabled' : ''}`}
        ref={selectorRef}
      >
        {/* Input — clicável em toda a zona */}
        <input
          type="text"
          value={searchQuery || (selectedOption ? selectedOption.label : '')}
          onChange={handleInputChange}
          onClick={handleToggle}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          readOnly={!open}
          style={{ cursor: 'pointer' }}
        />

        {/* Seta dentro do input, sem background, apenas ícone */}
        <div className="Selector_Arrow_Icon">
          <span className={open ? 'arrow_up' : 'arrow_down'}>▼</span>
        </div>

        {/* Botão azul Info — igual ao input normal */}
        {showInfo && (
          <div
            ref={infoRef}
            className="Selector_Info"
            onMouseEnter={handleInfoEnter}
            onMouseLeave={handleInfoLeave}
          >
            <span>?</span>
          </div>
        )}

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

        {/* Tooltip — renderizado fora para não ser cortado */}
        {infoText && tooltip && (
          <div
            className={`Info_Tooltip Info_Tooltip--${tooltip.placement}`}
            style={{
              position: 'fixed',
              top: tooltip.top,
              left: tooltip.left,
              width: TOOLTIP_WIDTH,
              ...arrowStyle,
            }}
          >
            {infoText}
          </div>
        )}
      </div>
    );
  }
);

Simple_Selector_And_Label.displayName = 'Simple_Selector_And_Label';

export default Simple_Selector_And_Label;