var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://crackling-heat-1593.firebaseio.com';

var App = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
    // this.state.items => {}
  },
  render: function() {
    console.log(this.state);
    
    return (<h1 className="red">
      Hello, React!!
    </h1>);
  }
});



var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
