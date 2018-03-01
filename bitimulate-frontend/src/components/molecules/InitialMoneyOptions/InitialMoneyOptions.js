import React from 'react';
import { Option } from 'components';
import { optionsPerCurrency } from 'lib/variables';

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