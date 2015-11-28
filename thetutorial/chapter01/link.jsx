var Link = React.createClass({
  render: function(){
    return (
      <a href={this.props.url}>{this.props.caption}</a>
    );
  }
});

var url = 'http://marialobillo.com';

ReactDOM.render(<Link url={url} caption='My Site' />, document.getElementById('nav'));
