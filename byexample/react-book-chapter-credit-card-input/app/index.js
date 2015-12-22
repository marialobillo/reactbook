import React from 'react';
import CreditCardInput from './components/CreditCardInput';

const APP_ROOT = document.createElement('div');
document.body.appendChild(APP_ROOT);

let types = {
  'Visa': /^4/,
  'MasterCard': /^5[1-5]/,
  'American Express': /^3[47]/
};

React.render(<CreditCardInput types={types}/>, APP_ROOT);
