import cn from 'classnames';
import classes from './UserAvatar.module.scss';
import AvatarExample from '../../../../assets/images/avatar-example.webp';

const UserAvatar = () => {
  return (
    <div className={cn(classes.userAvatarContainer)}>
      <div className={cn(classes.userAvatarImageBorder)}>
        <img
          src={AvatarExample}
          alt="avatar example"
          className={classes.userAvatarImage}
        />
      </div>
      <h5 className={classes.userAvatarName}>Name</h5>
    </div>
  );
};

export default UserAvatar;
