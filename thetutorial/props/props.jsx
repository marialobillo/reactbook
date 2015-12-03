var Elemento = React.createClass({
  render: function(){
    return (
      <button className="btn btn-primary">
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var options = {
  title: 'Inbox',
  number: 32
};

var element = React.createElement(Elemento, options);

ReactDOM.render( element, document.getElementById('content'));
