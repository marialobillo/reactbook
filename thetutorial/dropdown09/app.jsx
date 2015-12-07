
var Badge = React.createClass({
  render: function(){
    return (
      <div className="btn-group">
        <button onClick={this.props.whenClicked} type="button"
          className="btn btn-success dropdown-toggle" >
          {this.props.title}
          <span className="badge">{this.props.number}</span>
        </button>

      </div>
    );
  }
});

var ListItem = React.createClass({
    render: function(){
      return (
        <li>{this.props.item}</li>
      );
    }
});

var List = React.createClass({
  render: function() {

    return (
      Hello
    );
  }
});

var Dropdown = React.createClass({
  handleClick: function(){
    alert('Hello from dropdown')
  },
  render: function(){
    return (
      <div className="btn-group">
        <Badge whenClicked={this.handleClick} className="btn-success" title={this.props.title}
          subTitleClassName="caret" subTitle="29"/>
      </div>
    );
  }
});

var options = {
  title: 'Choose a desert',
  items: [
    'Apple Pie',
    'Peach Cobbler',
    'Coconut Cream Pie'
  ]
};


var element = React.createElement(Dropdown, options);

ReactDOM.render(element, document.querySelector('.target'));
