var Thumbnail = React.createClass({
  render: function(){
    return (
      <button className="btn btn-primary" type="button">
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var options = {
  title: 'Sent',
  number: 12
}

var element = React.createElement(Thumbnail, options);

ReactDOM.render(element, document.querySelector('.target'));
