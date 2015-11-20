
var Button = React.createClass({
	getInitialState: function(){
		return { counter: 0 };
	},
	handleClick: function(){
		this.setState({ counter: this.state.counter +1 });
	},
	render: function() {
		return (
			<button onClick={this.handleClick}>{this.state.counter}</button>
		);
	}
});

var Result  = React.createClass({
	render: function() {
		return (
			<a href="http://google.es">
				Google
			</a>
		);
	}
});

var Main  = React.createClass({
	render: function() {
		return (
			<div>
				<Result />
				<Button />
			</div>
		);
	}
});


ReactDOM.render(
	<Main  />,
	document.getElementById('root')
);
