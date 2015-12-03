var Elemento = React.createClass({
  render: function(){
    return (
      <button className="btn btn-primary">
        Messages <span className="badge">4</span>
      </button>
    );
  }
});

ReactDOM.render(<Elemento />, document.getElementById('content'));
