import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: props.active };


    this.handleChange = this.handleChange.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
  }

  handleChange(e) {
  	this.setState({ active: e });
  }

  logUserIn() {
  	this.props.onLogIn();
  }

  render() {
    return (
      <Tabs className="mxy-auto" id="login-board" value={this.state.active} onChange={this.handleChange}>
        <Tab label="Log In" value="a">
          <LoginForm logUserIn={this.logUserIn} />
        </Tab>
        <Tab label="Sign Up" value="b">
          <RegisterForm logUserIn={this.logUserIn} />
        </Tab>

      </Tabs>
    );
  }
}


const LoginForm = props => (
  <form >
    <TextField className="w-100" floatingLabelText="Email or Phone" />
    <TextField className="w-100" floatingLabelText="Password" type="Password" />
    <FlatButton
      className="w-100"
      backgroundColor="#a4c639"
      label="Login"
      onClick={props.logUserIn}
    />
  </form>
);

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: {
        fullname: '', phone: '', email: '', password: '', passwordAgain: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    // We validate our Form here
  }


  handleSubmit() {
    this.validateForm();
    this.props.logUserIn();
  }

  render() {
    const {
      fullname, phone, email, password, passwordAgain,
    } = this.state.formInput;

    return (
      <form >
        <TextField className="w-100" value={fullname} floatingLabelText="Enter your full name" required />
        <TextField className="w-100" value={phone} floatingLabelText="Enter your phone number" required type="text" />
        <TextField className="w-100" value={email} floatingLabelText="Enter your email address" required type="email" />
        <TextField className="w-100" value={password} floatingLabelText="Choose a password" required type="password" />
        <TextField className="w-100" value={passwordAgain} floatingLabelText="Confirm the above password" required type="password" />
        <FlatButton
          className="w-100"
          backgroundColor="#a4c639"
          label="Sign Up"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}
