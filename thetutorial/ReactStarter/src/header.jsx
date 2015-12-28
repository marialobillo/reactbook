var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return (
      text: ''
    );
  },
  render: function(){
    return (
      <div className="input-group">
        <input
          value={this.state.text}
          onChange={this.handleInputChange}
          type="text"
          className="form-control"/>
        <span className="input-group-btn">
          <button
            onClick={this.handleClick}
            className="btn btn-danger"
            type="button">
            Add
          </button>
        </span>
        {this.state.text}
      </div>
    );
  },
  handleClick: function() {
    //Send value of text input to Firebase
  },
  handleInputChange: function(){
    this.setState({text: event.target.value});
  }
});
