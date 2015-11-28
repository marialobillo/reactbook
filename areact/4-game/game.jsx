var StarsFrame = React.createClass({
  render: function(){
    var stars = [];
    for (var i=0; i<this.props.numberOfStars; i++){
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
      );
    }

    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
});

var ButtonFrame = React.createClass({
  render: function(){
    return (
      <div id="button-frame">
        <button className="btn btn-primary btn-lg">=</button>
      </div>
    );
  }
});

var AnswerFrame = React.createClass({
  render: function(){
    var props = this.props;
    var selectedNumbers = props.selectedNumbers.map(function(i){
      return (
        <span onClick={props.unselectNumber.bind(null, i)}>{i}</span>
      );
    });
    return (
      <div id="answer-frame">
        <div className="well">
          {selectedNumbers}
        </div>
      </div>
    );
  }
});

var NumbersFrame = React.createClass({
  render: function(){

    var numbers = [], className,
      selectNumber = this.props.selectNumber,
      selectedNumbers = this.props.selectedNumbers;
    for(var i=1; i <= 9; i++){
      className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
      numbers.push(
        <div className={className} onClick={selectNumber.bind(null, i)}>
          {i}
        </div>
      );
    }
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
});


var Game = React.createClass({
  getInitialState: function(){
    return { numberOfStars: Math.floor(Math.random()*9) + 1, selectedNumbers: []};
  },
  selectNumber: function(clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0){
      this.setState(
        { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)}
      );
    }
  },
  unselectNumber: function(clickedNumber) {
    var selectedNumbers = this.state.selectedNumbers,
      indexOfNumber = selectedNumbers.indexOf(clickedNumber);

    selectedNumbers.splice(indexOfNumber, 1);

    this.setState({ selectedNumbers: selectedNumbers });
  },
  render: function(){
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
        <StarsFrame numberOfStars={this.state.numberOfStars }/>
        <ButtonFrame />
        <AnswerFrame selectedNumbers={this.state.selectedNumbers}
            unselectedNumber={this.unselectedNumber}/>
        </div>

        <NumbersFrame selectedNumbers={this.state.selectedNumbers}
          selectNumber={this.selectNumber} />
      </div>
    );
  }
});


ReactDOM.render(
  <Game />,
    document.getElementById('container')
);
