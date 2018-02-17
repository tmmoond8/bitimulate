import React from 'react';
import styles from './InitialMoneyOptions.scss';
import classNames from 'classnames/bind';
import { Option } from 'components';
import { optionsPerCurrency } from 'lib/variables';

const cx = classNames.bind(styles);

const multipliers = [1, 10, 100];

const initialOptions = (currency, multiplier) => {
  const currencyInfo = optionsPerCurrency[currency]
  return `${currencyInfo.symbol} ${(currencyInfo.initialValue * multiplier).toLocaleString()}`
}

const InitialMoneyOptions = ({currency, initialMoneyIndex, onSetInitialMoneyIndex}) => {
  return (
    <div>
      { multipliers.map((multiplier, index) => {
        return (
          <Option 
            key={index} 
            active={initialMoneyIndex === index}
            onSetInitialMoneyIndex={() => onSetInitialMoneyIndex(index)}
          >
            {initialOptions(currency, multiplier)}
          </Option>
        )
      })}
    </div>
  );
};

export default InitialMoneyOptions;