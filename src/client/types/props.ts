import { IconProps } from 'react-bootstrap-icons';

export interface CustomIconProps extends Partial<IconProps> {
  callback: () => void;
  icon: React.ReactElement<IconProps>;
}
