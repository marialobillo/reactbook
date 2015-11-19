var CommentBox = React.createClass({ displayName: 'CommentBox',
		 render: function(){
		     return (
			 React.createElement('div', {className: "commentBox"},
					     "Hello, world! Again I am a CommentBox."
			)
		     );
		 }
    
				   });
ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);
