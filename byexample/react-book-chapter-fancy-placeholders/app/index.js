import './styles.css';
import React from 'react';
import FancyInput from './components/FancyInput';

const DIV = document.createElement('div');
document.body.appendChild(DIV);

React.render(<FancyInput placeholder="First name"/>, DIV);
