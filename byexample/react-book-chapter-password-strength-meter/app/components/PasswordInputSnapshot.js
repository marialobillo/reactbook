import React from 'react';
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
               <Col md={8}>
                 <PasswordField password={password}
                                onPasswordChange={this.changePassword}
                                principles={goodPasswordPrinciples} />
               </Col>
               <Col md={4}>
                 <StrengthMeter password={password}
                                principles={goodPasswordPrinciples} />
               </Col>
             </Row>
            </Grid>
           );
  }
}

const SPECIAL_CHARS_REGEX = /[^A-Za-z0-9]/;
const DIGIT_REGEX = /[0-9]/;

PasswordInput.defaultProps = {
  goodPasswordPrinciples: [
    {
      label: "6+ characters",
      predicate: password => password.length >= 6
    },
    {
      label: "with at least one digit",
      predicate: password => password.match(DIGIT_REGEX) !== null
    },
    {
      label: "with at least one special character",
      predicate: password => password.match(SPECIAL_CHARS_REGEX) !== null
    }
  ]
};

class StrengthMeter extends React.Component {
  render() {
    return (
      <Panel>
        <PrinciplesProgress {...this.props} />
        <h5>A good password is:</h5>
        <PrinciplesList {...this.props} />
      </Panel>
    );
  }
}

class PrinciplesProgress extends React.Component {
  satisfiedPercent() {
    let { principles, password } = this.props;

    let satisfiedCount = principles.map(p => p.predicate(password))
                                   .reduce((count, satisfied) =>
                                      count + (satisfied ? 1 : 0)
                                   , 0);

    let principlesCount = principles.length;

    return (satisfiedCount / principlesCount) * 100.0;
  }

  progressColor() {
    let percentage = this.satisfiedPercent();

    return classNames({
      danger: (percentage < 33.4),
      success: (percentage >= 66.7),
      warning: (percentage >= 33.4 && percentage < 66.7)
    });
  }

  render() {
    return (<ProgressBar now={this.satisfiedPercent()}
                         bsStyle={this.progressColor()} />);
  }
}

class PrinciplesList extends React.Component {
  principleSatisfied(principle) {
    let { password } = this.props;

    return principle.predicate(password);
  }

  principleClass(principle) {
    let satisfied = this.principleSatisfied(principle);

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
        <li className={this.principleClass(principle)}>
          <small>
            {principle.label}
          </small>
        </li>
        )}
      </ul>
    );
  }
}

class PasswordField extends React.Component {
  constructor(props) {
    super(props);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(ev) {
    let { onPasswordChange } = this.props;
    onPasswordChange(ev.target.value);
  }

  satisfiedPercent() {
    let { principles, password } = this.props;

    let satisfiedCount = principles.map(p => p.predicate(password))
                                   .reduce((count, satisfied) =>
                                      count + (satisfied ? 1 : 0)
                                   , 0);

    let principlesCount = principles.length;

    return (satisfiedCount / principlesCount) * 100.0;
  }

  inputColor() {
    let percentage = this.satisfiedPercent();

    return classNames({
      error: (percentage < 33.4),
      success: (percentage >= 66.7),
      warning: (percentage >= 33.4 && percentage < 66.7)
    });
  }

  render() {
    let { password } = this.props;

    return (
      <Input
        type='password'
        label='Password'
        value={password}
        bsStyle={this.inputColor()}
        onChange={this.handlePasswordChange}
        hasFeedback
      />
    );
  }
}

export default PasswordInput;
