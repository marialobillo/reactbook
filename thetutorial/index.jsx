var Button = React.createClass({
    getInitialState: function(){
    		     return {
		     counter: 0
		     };
    },
    handleClick: function(){
    		 this.setState({ counter: this.state.counter + 1});
    },
    render: function() {
    	    return (
     	    	   <button onClick={this.handleClick}>{this.state.counter}</button>
    	);
  }
});



ReactDOM.render(
  <Button />,
  document.getElementById('root')
);
