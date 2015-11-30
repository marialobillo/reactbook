var Tasks = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          {this.props.children}
        </ul>
      </div>
    );
  }
});


var Task = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    done: React.PropTypes.bool,
    updated: React.PropTypes.bool,
  },
  getDefaultProps: function() {
    return ({
      done: false,
      updated: false,
      count: 0
    });
  },
  opUpdate: function(){
    this.setState({
      updated: true
    });
  },
  render: function() {
    var subject = '(Subject: ' + this.props.name + ')';
    return (
      <li className={this.props.done ? 'done' : ''} onClick={this.onUpdate}>
        <input type="checkbox" checked={this.props.done} />
        {this.props.name}<small>{subject}</small>
      </li>
    );
  }
});

var Image = React.createClass({
  render: function(){
    return (
      <img {...this.props}/>
    );
  }
});

var ToDo = React.createClass({
  componentDidMount: function(){
    console.log(this.refs.one.getDOMNode());
  },
  render: function() {
    return (
      <ul>
        <Tasks>
          <Task ref='one' name="Introduction" done='true' />
          <Task name='Chapter 1 - First Component' done='true' />
          <Task name='Chapter 2 - Properties'  />
          <Task name='Unknown'/>
        </Tasks>
      </ul>

    );
  }
});

ReactDOM.render(<ToDo />, document.getElementById('example'));
