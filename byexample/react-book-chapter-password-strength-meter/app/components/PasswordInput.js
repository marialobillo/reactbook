import React from 'react/addons';
import { Grid, Row, Col, Panel, ProgressBar, Input } from 'react-bootstrap';
import classNames from 'classnames';

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '' };

    this.changePassword = this.changePassword.bind(this);
  }

  changePassword(password) {
    this.setState({ password });
  }

  render() {
    let { goodPasswordPrinciples } = this.props;
    let { password } = this.state;

    return (
            <Grid>
             <Row>
               <PasswordField password={password}
                              onPasswordChange={this.changePassword}
                              principles={goodPasswordPrinciples} />
               <StrengthMeter password={password}
                              principles={goodPasswordPrinciples} />
             </Row>
            </Grid>
           );
  }
}

const SPECIAL_CHARS_REGEX = /[^A-Za-z0-9]/;
const DIGIT_REGEX = /[0-9]/;

PasswordInput.defaultProps = {
  goodPasswordPrinciples: [
    { label: "6+ characters",
      predicate: (input) => input.length >= 6 },
    { label: "with at least one digit",
      predicate: (input) => input.match(DIGIT_REGEX) !== null },
    { label: "with at least one special character",
      predicate: (input) => input.match(SPECIAL_CHARS_REGEX) !== null }
  ]
};

class PasswordField extends React.Component {
  constructor(props) {
    super(props);

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.satisfiedPrinciplesPercent = this.satisfiedPrinciplesPercent.bind(this);
    this.inputStyle = this.inputStyle.bind(this);
  }

  inputStyle() {
    let percentage = this.satisfiedPrinciplesPercent();
    if (percentage <= 33) { return 'error'; }
    if (percentage > 67) { return 'success'; }
    return 'warning';
  }

  satisfiedPrinciplesPercent() {
    let { principles, password } = this.props;

    let principleResults = principles.map(principle =>
                                            principle.predicate(password));

    let passedPrinciples = principleResults.reduce(
                             (accu, result) => accu + (result ? 1 : 0),
                             0);

    return Math.round((passedPrinciples / principleResults.length) * 100.0);
  }

  handlePasswordChange(ev) {
    let { onPasswordChange } = this.props;
    onPasswordChange(ev.target.value);
  }

  render() {
    let { password } = this.props;

    return (<Col md={8}>
              <Input
                type='password'
                value={password}
                label='Password'
                onChange={this.handlePasswordChange}
                bsStyle={this.inputStyle()}
                hasFeedback
              />
            </Col>);
  }
}

class StrengthMeter extends React.Component {
  render() {
    return (<Col md={4}>
              <Panel>
                <PrinciplesProgress {...this.props} />
                <h5>A good password is:</h5>
                <PrinciplesList {...this.props} />
              </Panel>
            </Col>);
  }
}

class PrinciplesProgress extends React.Component {
  constructor(props) {
    super(props);

    this.progressBarStyle = this.progressBarStyle.bind(this);
    this.satisfiedPrinciplesPercent = this.satisfiedPrinciplesPercent.bind(this);
  }

  progressBarStyle() {
    let percentage = this.satisfiedPrinciplesPercent();

    if (percentage <= 33) { return 'danger'; }
    if (percentage > 67) { return 'success'; }
    return 'warning';
  }

  satisfiedPrinciplesPercent() {
    let { principles, password } = this.props;

    let principleResults = principles.map(principle =>
                                            principle.predicate(password));

    let passedPrinciples = principleResults.reduce(
                             (accu, result) => accu + (result ? 1 : 0),
                             0);

    return Math.round((passedPrinciples / principleResults.length) * 100.0);
  }

  render() {
    return (<ProgressBar now={this.satisfiedPrinciplesPercent()}
                         bsStyle={this.progressBarStyle()} />);
  }
}

class PrinciplesList extends React.Component {
  constructor(props) {
    super(props);

    this.satisfiesPrinciple = this.satisfiesPrinciple.bind(this);
    this.principleClasses = this.principleClasses.bind(this);
  }

  satisfiesPrinciple(principle) {
    let { password } = this.props;

    return principle.predicate(password);
  }

  principleClasses(principle) {
    let satisfied = this.satisfiesPrinciple(principle);

    return classNames({
      ["text-success"]: satisfied,
      ["text-danger"]: !satisfied
    });
  }

  render() {
    let { principles } = this.props;

    return (
      <ul>
        {principles.map(principle =>
          <li className={this.principleClasses(principle)}>
            <small>{principle.label}</small>
          </li>
        )}
      </ul>
    );
  }
}

export default PasswordInput;
