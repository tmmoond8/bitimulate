import React from 'react';
import logo from 'static/images/logo.png';
import styles from './Logo.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Logo = () => {
  return (
    <div className={cx('logo')}>
      bitimulate
    </div>
  );
};

export default Logo;