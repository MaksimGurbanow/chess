/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { CustomIconProps } from '../../types/props';

const CustomIcon = ({
  icon,
  callback,
  color = 'white',
  size = 30,
}: Partial<CustomIconProps>) => {
  return (
    <div>{React.cloneElement(icon!, { color, size, onClick: callback })}</div>
  );
};

export default CustomIcon;
