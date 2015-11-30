var Link = React.createClass({
  onClick: function(event) {
    event.preventDefault();
    alert('You clicked me!');
  },
  render: function() {
    return (
      <a href={this.props.url} onClick={this.onClick}>{this.props.caption}</a>
    );
  }
});

ReactDOM.render(<Link />, document.getElementById('example'));
