var Task = React.createClass({
  render: function() {
    return (
      <li>
        <input type="checkbox {(this.props.done ? 'checked' : '')}" />
        {this.props.name}
      </li>
    );
  }
});
