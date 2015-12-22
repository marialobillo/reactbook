import './styles.css';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import SortableTable from './components/SortableTable';

const APP_ROOT = document.createElement('div');
document.body.appendChild(APP_ROOT);

React.render(<SortableTable />, APP_ROOT);
