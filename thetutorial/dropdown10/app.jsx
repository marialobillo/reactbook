
var ListItem = React.createClass({
  handleClick: function(){
    this.props.whenItemClicked();
    console.log.('I was clicked!');
  },
  render: function(){
    return (
      <li><a onClick={this.handleClick} href="">{this.props.item}</a></li>
    );
  }
});

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


var Dropdown = React.createClass({
  handleClick: function(){
    this.setState({open: !this.state.open});
  },
  getInitialState: function(){
    return { open: false }
  },
  handleItemClick: function(){

  },
  render: function(){
    var list = this.props.items.map(function(item){
      return (
        <ListItem item={item} whenItemClicked={this.handleItemClick} />
      );
    }.bind(this));
    return (
      <div className="btn-group">
        <Badge whenClicked={this.handleClick} className="btn btn-success" title={this.props.title}
          subTitleClassName="caret" subTitle="29"/>
        <ul className={"dropdown-menu " + (this.state.open ? "show" : "") }>
          {list}
        </ul>
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
