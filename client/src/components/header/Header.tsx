import { PersonCircle, XCircle } from 'react-bootstrap-icons';
import classes from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import CustomIcon from '../customIcon/CustomIcon';
import Button from '../Button/Button';
import { User } from '../../types/types';
import cn from 'classnames';

const user: User = {
  username: 'f',
  email: 'f',
  password: 'f',
  darkTheme: false,
  wins: 0,
  loses: 0,
  games: 0,
  draws: 0,
};

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={classes.header}>
      {pathname === '/login' && (
        <Link to="/" className={cn(classes.link, classes.closeIcon)}>
          <CustomIcon icon={<XCircle />} />
        </Link>
      )}
      <ul className={classes.headerList}>
        {pathname !== '/login' && (
          <Button className={classes.loginButton}>
            <Link className={classes.link} to="/login">
              Login
            </Link>
          </Button>
        )}
        {user && (
          <Link className={classes.link} to="/profile">
            <CustomIcon icon={<PersonCircle />} />
          </Link>
        )}
      </ul>
    </header>
  );
};

export default Header;
