import { forwardRef, useState, useRef } from 'react';
import './Simple_Input_And_Label.scss';

interface SimpleInputAndLabelProps {
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'date' | 'time' | 'datetime-local';
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
  arrowOffset: number; // posição da seta perpendicular ao eixo do tooltip
}

const Simple_Input_And_Label = forwardRef<HTMLInputElement, SimpleInputAndLabelProps>(
  ({ value, name, onChange, placeholder, type = 'text', showInfo = false, infoText }, ref) => {
    const [tooltip, setTooltip] = useState<TooltipState | null>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
      if (!infoRef.current || !infoText) return;
      const r = infoRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const btnCenterX = r.left + r.width / 2;
      const btnCenterY = r.top + r.height / 2;

      // --- Tenta RIGHT ---
      if (r.right + GAP + TOOLTIP_WIDTH <= vw - PADDING) {
        const left = r.right + GAP;
        let top = btnCenterY - TOOLTIP_ESTIMATED_HEIGHT / 2;
        top = Math.max(PADDING, Math.min(top, vh - TOOLTIP_ESTIMATED_HEIGHT - PADDING));
        const arrowOffset = btnCenterY - top; // distância do topo do tooltip até à seta
        return setTooltip({ top, left, placement: 'right', arrowOffset });
      }

      // --- Tenta LEFT ---
      if (r.left - GAP - TOOLTIP_WIDTH >= PADDING) {
        const left = r.left - GAP - TOOLTIP_WIDTH;
        let top = btnCenterY - TOOLTIP_ESTIMATED_HEIGHT / 2;
        top = Math.max(PADDING, Math.min(top, vh - TOOLTIP_ESTIMATED_HEIGHT - PADDING));
        const arrowOffset = btnCenterY - top;
        return setTooltip({ top, left, placement: 'left', arrowOffset });
      }

      // --- Fallback BOTTOM ---
      const top = r.bottom + GAP;
      let left = btnCenterX - TOOLTIP_WIDTH / 2;
      left = Math.max(PADDING, Math.min(left, vw - TOOLTIP_WIDTH - PADDING));
      const arrowOffset = btnCenterX - left; // distância da esquerda do tooltip até à seta
      setTooltip({ top, left, placement: 'bottom', arrowOffset });
    };

    const handleMouseLeave = () => setTooltip(null);

    const arrowStyle = tooltip
      ? tooltip.placement === 'bottom'
        ? { '--arrow-pos': `${tooltip.arrowOffset}px`, '--arrow-axis': 'horizontal' } as React.CSSProperties
        : { '--arrow-pos': `${tooltip.arrowOffset}px`, '--arrow-axis': 'vertical' } as React.CSSProperties
      : {};

    return (
      <div className='Global_Input'>
        <input
          ref={ref}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {showInfo && (
          <div
            ref={infoRef}
            className='Info'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>?</span>
          </div>
        )}
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

Simple_Input_And_Label.displayName = 'Simple_Input_And_Label';

export default Simple_Input_And_Label;