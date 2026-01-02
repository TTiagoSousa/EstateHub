import './Simple_Button.scss';
import { Link } from 'react-router-dom';

interface SimpleButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
}

const Simple_Button = ({ text, disabled, onClick, to = '#' }: SimpleButtonProps) => {
  return (
    <Link className='Simple_Button' to={to}>
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </Link>
  );
};

export default Simple_Button;