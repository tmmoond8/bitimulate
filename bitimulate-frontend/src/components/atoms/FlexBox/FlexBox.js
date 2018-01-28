import React from 'react';
import styles from './FlexBox.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const FlexBox = ({row, column, className, children, center, ...rest}) => {
  return (
    <div className={cx('flex-box', {
      row,
      column,
      center
    }, className)}
    {...rest}>
    { children }
    </div>
  );
};

export default FlexBox;