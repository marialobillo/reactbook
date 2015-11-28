var Hello = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

var Message = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Hello React</h1>
        <Hello name="Maria" />
      </div>
    );
  }
});


ReactDOM.render(<Message />, document.getElementById('example'));
