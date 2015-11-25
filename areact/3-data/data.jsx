var Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var component = this;
    $.get("https://api.github.com/users/" + this.props.login , function(data){
      component.setState(data);
    });
  },
  render: function() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80" />
          <h3>{this.state.name}</h3>
          <hr />
      </div>
    );
  }
});
var Form = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Github Login" />
          <button>Add</button>
      </form>
   )
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {logins: []};
  },
  render: function() {
    var cards = this.state.logins.map(function(login){
      return (<Card login={login} />);
    });
    return (
      <div>
        <Form />
      </div>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById("root"));
