var Badge = React.createClass({
  render: function(){
    return (
      <button className="btn btn-primary" type="button">
        {this.props.title} <span className="badge">{this.props.number}</span>
      </button>
    );
  }
});

var Thumbnail = React.createClass({
    render: function(){
      return (
        <div className="thumbnail">
          <img src={this.props.imageUrl} />
          <div className="caption">
            <h3>{this.props.header}</h3>
            <p>{this.props.description}</p>
            <p>
              <a href="#" className="btn btn-primary" role="button">Button</a>
              <a href="#" className="btn btn-default" role="button">Button</a>
            </p>
          </div>
        </div>
      );
    }
});

var options = {
  title: 'Sent',
  number: 12,
  header: 'Learn React',
  description: 'React is fantastic new library for making fast, dynamic pages.'
}

var element = React.createElement(Thumbnail, options);

ReactDOM.render(element, document.querySelector('.target'));
