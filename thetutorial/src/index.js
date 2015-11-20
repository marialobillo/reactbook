var Hello = React.createClass({
    render: function(){
	return (
	    React.createElement('div', {className: "commentBox"},
				"<h2>Hello, world! I am a CommentBox.</h2>"
		)
	);
    }
});

ReactDOM.render(
    React.createElement(Hello, null),
    document.getElementById('example')
);
