import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles.css';

import debug from 'debug';
import React from 'react';
import Prefixer from './components/Prefixer';

const ELEMENT1 = document.createElement('div');
document.body.appendChild(ELEMENT1);
React.render(<Prefixer />, ELEMENT1);

const ELEMENT2 = document.createElement('div');
document.body.appendChild(ELEMENT2);
React.render(<Prefixer initialCountry={"Serbia"} />, ELEMENT2);

const ELEMENT3 = document.createElement('div');
document.body.appendChild(ELEMENT3);
React.render(<Prefixer initialCountry={"Narnia"} />, ELEMENT3);