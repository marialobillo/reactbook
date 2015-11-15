var Hello = React.createClass({
    render: function(){
	return React.DOM.div(
	    {className: 'mystyle'},
	    'Hello ' + this.props.name
	);
    }
});

React.render(Hello({name: 'Maria'}), document.body);
