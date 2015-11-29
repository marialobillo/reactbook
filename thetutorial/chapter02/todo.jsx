var Task = React.createClass({
  getDefaultProps: function() {
    return ({
      name: 'Unknown chapter',
      done: false
    });
  },

  render: function() {
    return (
      <li>
        <input type="checkbox" checked={this.props.done} />
        {this.props.name}
      </li>
    );
  }
});

var ToDo = React.createClass({
  render: function() {
    return (
      <ul>
        <Task name="Introduction" done='true' />
        <Task name='Chapter 1 - First Component' done='true' />
        <Task name='Chapter 2 - Properties'  />
        <Task />
      </ul>
    );
  }
});

ReactDOM.render(<ToDo />, document.getElementById('example'));
