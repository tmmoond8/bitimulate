import React from 'react';
import styles from './InputError.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const InputError = ({children, error, ...rest}) => {
  return (
    <div className={cx('input-error')} {...rest}>
      {error}
    </div>
  );
};

export default InputError;