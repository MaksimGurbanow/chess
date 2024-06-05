import { PersonCircle } from 'react-bootstrap-icons';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import CustomIcon from '../customIcon/CustomIcon';
import Button from '../button/Button';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <ul className="header-list">
        <Button onClick={() => navigate('/login')}>Login</Button>
        <CustomIcon
          icon={<PersonCircle />}
          callback={() => navigate('/profile')}
        />
      </ul>
    </header>
  );
};

export default Header;
