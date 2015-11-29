var Task = React.createClass({
  render: function() {
    return (
      <li>
        <input type="checkbox {(this.props.done ? 'checked' :'')}" />
        {this.props.name}
      </li>
    );
  }
});

var ToDo = React.createClass({
  render: function() {
    return (
      <ul>
        <Task name="Introduction" done='fase' />
        <Task name='Chapter 1 - First Component' done='true' />
        <Task name='Chapter 2 - Properties' done='false' />
      </ul>
    );
  }
});

ReactDOM.render(<ToDo />, document.getElementById('example'));
