import React from 'react';
import { Button } from 'react-bootstrap';

class PreventiveButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };

    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  enable() {
    this.setState( { disabled: false } );
  }

  disable() {
    this.setState( { disabled: true } );
  }

  handleButtonClick() {
    this.disable();
    this.props.action(this);
  }

  reset() {
    this.enable();
  }

  render () {
    let { disabled } = this.state;
    let { label } = this.props;
    let text = (disabled) ? "Submitting..." : label;
    return <Button bsStyle='primary' disabled={disabled} onClick={this.handleButtonClick}>{text}</Button>;
  }
}

export default PreventiveButton;
