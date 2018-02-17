import React from 'react';
import styles from './SelectCurrency.scss';
import classNames from 'classnames/bind';
import { initialCurrencies } from 'lib/variables';

const cx = classNames.bind(styles);

const Currency = ({children, symbol, active, onSetCurrency}) => (
  <div className={cx('currency', {active})} onClick={onSetCurrency}>
    <div className={cx('symbol')}>{symbol}</div>
    <div className={cx('text')}>{children}</div>
  </div>
)

const SelectCurrency = ({currency, onSetCurrency}) => {
  return (
    <div className={cx('select-currency')}>
      {initialCurrencies.map((item, index) => {
        return (
          <Currency 
            symbol={item.symbol}
            active={currency === item.name}
            onSetCurrency={() => onSetCurrency(item.name)}
            key={index}
          >
            {item.name}
          </Currency>)
      })}
    </div>
  );
};

export default SelectCurrency;