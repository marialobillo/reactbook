import 'normalize.css';
import './styles.css';

import debug from 'debug';
import React from 'react';
import TweetBox from './components/TweetBox';

const log = debug('application:bootstrap');

// Enable debug messages outside of production
if (process.env.NODE_ENV !== 'production') {
  debug.enable('application:*');
}

log('creating application node');
const applicationNode = document.createElement('div');
applicationNode.className = 'application';
applicationNode.id = 'application';

log('adding application node to body');
document.body.appendChild(applicationNode);

log('mounting application');

let tweetSubmitted = (tweetData) => {
  console.log("Tweet Submitted!");
  console.log(tweetData);
};

React.render(<TweetBox tweetSubmitted={tweetSubmitted} />, applicationNode);
