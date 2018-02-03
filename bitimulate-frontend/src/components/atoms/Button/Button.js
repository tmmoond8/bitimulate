import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({children, className, roundCorner, invert, ...rest}) => {
  return (
    <div className={
      cx('button', {
        'round-corner': roundCorner,
        invert
      }, className)
    } {...rest}>
      {children}
    </div>
  );
};

export default Button;