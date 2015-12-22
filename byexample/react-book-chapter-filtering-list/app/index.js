import '../node_modules/bootstrap/dist/css/bootstrap.css';

import React from 'react/addons';
import ChannelSearch from './components/ChannelSearch';

const APP_ROOT = document.createElement('div');
document.body.appendChild(APP_ROOT);

React.render(<ChannelSearch />, APP_ROOT);
