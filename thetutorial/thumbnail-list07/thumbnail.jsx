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
              <Badge title={this.props.title} number={this.props.number}/>
            </p>
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

var options = {
  thumbnailData: [{
  title: 'See Tutorials',
  number: 32,
  header: 'Learn React',
  description: 'React is fantastic new library for making fast, dynamic pages.',
  imageUrl: 'http://formatjs.io/img/react.svg'
  },
  {
  title: 'Show Courses',
  number: 25,
  header: 'Learn EmberJS',
  description: 'Ember is fantastic new frameword for rendering web pages.',
  imageUrl: 'https://media-mediatemple.netdna-ssl.com/wp-content/uploads/2013/11/emberjs-logo.png'
  }
]};


var element = React.createElement(ThumbnailList, options);

ReactDOM.render(element, document.querySelector('.target'));
