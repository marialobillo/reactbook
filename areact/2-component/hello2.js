var CommentBox = React.createClass({ displayName: 'CommentBox',
		 render: function(){
		     return (
			     <div className="commentList">
			     Hello, world! I am a CommentList
			 </div>
		     );
		 }
    
				   });

var CommentForm = React.createClass({
    render: function() {
	    <div className="commentForm">
	    Hello, world! I am a CommentForm.
	</div>
    }
});


ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);


