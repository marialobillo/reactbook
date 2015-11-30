var heroesListData = [
  { name: 'Superman', power: 'fly with underwear'},
  { name: 'Batman', power: 'belt with gadgets'},
  { name: 'Spiderman', power: 'Jump like a monkey'},
  { name: 'Hulk', power: 'Angry with anymore'}
];

var Heroes = React.createClass({
  getInitialState: function() {
    return ({
      list: []
    });
  },
  componentDidMount: function(){
    setTimeout(function() {
      this.setState({
        list: heroesListData
      });
    }.bind(this), 2000);
  },
  render: function(){
    if (!this.state.list.length) {
      return (<div> No heroes!</div>);
    }
    return (
      <ul>
        {this.state.list.map(function(heroe, index){
          return (<li key={index}>
          //  {heroe.name} the {heroe.power}
                </li>);
        })}
      </ul>
    );
  }
});

ReactDOM.render(<Heroes />, document.getElementById('content'));
