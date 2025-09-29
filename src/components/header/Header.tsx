import { PersonCircle } from 'react-bootstrap-icons';
// import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import classes from './Header.module.scss';
import CustomIcon from '../customIcon/CustomIcon';
import Button from '../Button/Button';
import { useUser } from '../../context/useUser';

const Header = () => {
  const { pathname } = useLocation();
  const { user, logout } = useUser();

  return (
    <header className={classes.header}>
      {/* {pathname === '/login' && (
        <Link to="/" className={cn(classes.link, classes.closeIcon)}>
          <CustomIcon icon={<XCircle />} />
        </Link>
      )} */}
      <ul className={classes.headerList}>
        {!['/login', '/signup'].includes(pathname) && (
          <div className={classes.buttonsWrapper}>
            {!user ? (
              <>
                <Button className={classes.loginButton}>
                  <Link className={classes.link} to="/login">
                    Login
                  </Link>
                </Button>
                <Button className={classes.signupButton}>
                  <Link className={classes.link} to="/signup">
                    SignUp
                  </Link>
                </Button>
              </>
            ) : (
              <Button className={classes.logoutButton} onClick={() => logout()}>
                Logout
              </Button>
            )}
          </div>
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
