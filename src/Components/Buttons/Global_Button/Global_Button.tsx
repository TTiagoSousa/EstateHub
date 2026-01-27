import './Global_Button.scss';
import { Link } from 'react-router-dom';

interface GlobalButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  hoverDuration?: number;
  icon?: string | React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const Global_Button = ({ 
  text, 
  disabled, 
  onClick, 
  to = '#',
  backgroundColor,
  textColor,
  hoverTextColor,
  hoverDuration = 0.2,
  icon,
  iconPosition = 'left',
  className = ''
}: GlobalButtonProps) => {
  
  const buttonStyle: React.CSSProperties = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    ...(hoverDuration && { transition: `all ${hoverDuration}s ease` }),
    ...(hoverTextColor && { 
      '--hover-text-color': hoverTextColor 
    } as React.CSSProperties),
  };

  const buttonContent = (
    <button 
      disabled={disabled} 
      onClick={onClick}
      style={buttonStyle}
      className={`${className} ${hoverTextColor ? 'has-hover-color' : ''}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="Button_Icon Icon_Left">
          {typeof icon === 'string' ? icon : icon}
        </span>
      )}
      <span className="Text">{text}</span>
      {icon && iconPosition === 'right' && (
        <span className="Button_Icon Icon_Right">
          {typeof icon === 'string' ? icon : icon}
        </span>
      )}
    </button>
  );

  return (
    <Link className='Global_Button' to={to}>
      {buttonContent}
    </Link>
  );
};

export default Global_Button;