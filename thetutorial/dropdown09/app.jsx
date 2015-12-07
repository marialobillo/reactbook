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
