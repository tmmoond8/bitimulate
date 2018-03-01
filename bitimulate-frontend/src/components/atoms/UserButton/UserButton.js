import React from 'react';
import styles from './UserButton.scss';
import classNames from 'classnames/bind';
import UserIcon from 'react-icons/lib/io/ios-person';

const cx = classNames.bind(styles);

const UserButton = ({displayName}) => {
  return (
    <div className={cx('user-button')}>
      <UserIcon/>
      <div className="username">
        {displayName}
      </div>
    </div>
  );
};

export default UserButton;