var CommentBox = React.createClass({ 
		 render: function(){
		     return (
			     <div className="commentBox">
			       <h1>Comments</h1>
			       <CommentList />
			       <CommentForm />
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
