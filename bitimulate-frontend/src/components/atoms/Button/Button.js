import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({
  children, 
  flex,
  className,
  invert,
  roundCorner,
  flat,
  color,
  style,
  disabled,
  ...rest
}) => {
  return (
    <div className={
      cx('button', {
        invert,
        flex,
        flat,
        disabled,
        roundCorner
      }, color, className)
    }
    style={{
      ...style
    }}
      {...rest}>
      {children}
    </div>
  );
};

export default Button;