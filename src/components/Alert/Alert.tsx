import classNames from 'classnames';
import { useEffect, useState } from 'react';
import classes from './Alert.module.scss';
import { AlertProps } from '../../types/props';
import Button from '../Button/Button';

const Alert = ({
  className,
  duration = 1000,
  onClose,
  showCloseButton = true,
  type,
  message,
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [duration]);

  useEffect(() => {
    if (!isVisible && onClose) {
      onClose();
    }
  }, [isVisible, onClose]);
  return (
    <div
      className={classNames(
        classes.alertWrapper,
        {
          [classes.error]: type === 'error',
          [classes.success]: type === 'success',
          [classes.info]: type === 'info',
        },
        className
      )}
    >
      <div className={classNames(classes.alertMessage)}>{message}</div>
      {showCloseButton && (
        <Button onClick={handleClose} className={classes.alertButton}>
          X
        </Button>
      )}
    </div>
  );
};

export default Alert;
