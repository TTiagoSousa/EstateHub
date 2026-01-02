import './Header_Index.scss';
import { Link } from 'react-router-dom';

const Header_Index = () => {

  return (
    <div className="Header_Index">
      <div className="Left_Side">
        <div className="Company_Name">
          <span>Estate</span>
          <span>Hub</span>
        </div>
      </div>
      <div className="Center"></div>
      <div className="Right_Side">
        <Link to="Auth">
          <span>Login</span>
        </Link>
        <Link to={''}>
          <span>Register</span>
        </Link>
      </div>
    </div>
  )
}

export default Header_Index