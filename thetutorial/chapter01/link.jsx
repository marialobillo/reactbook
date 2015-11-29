var Link = React.createClass({
  render: function(){
    return (
      <a href={this.props.url} className={this.props.color}>{this.props.caption}</a>
    );
  }
});

var url = 'http://marialobillo.com';

ReactDOM.render(<Link url={url} caption='My Site' color='none'/>, document.getElementById('nav'));
