
var Badge = React.createClass({
  render: function(){
    return (
      <div className="btn-group">
        <button onClick={this.props.whenClicked} type="button"
          className="btn btn-success dropdown-toggle" >
          {this.props.title}
          <span className="badge">{this.props.number}</span>
        </button>

        <ul className="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div>
    );
  }
});

var Thumbnail = React.createClass({
    render: function(){
      return (
        <div className="col-sm-5 col-md-3">
        <div className="thumbnail">
          <img src={this.props.imageUrl} />
          <div className="caption">
            <h3>{this.props.header}</h3>
            <p>{this.props.description}</p>
            <p>
              <Badge title={this.props.title} number={this.props.number}/>
            </p>
          </div>
        </div>
      </div>
      );
    }
});

var ThumbnailList = React.createClass({
  render: function() {
    var list = this.props.thumbnailData.map(function(thumbnailProps){
      return <Thumbnail {...thumbnailProps} />
    });

    return (
      <div>{list}</div>
    );
  }
});

var Dropdown = React.createClass({
  handleClick: function(){
    alert('Hello from dropdown')
  },
  render: function(){
    return (
      <div className="btn-">
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
