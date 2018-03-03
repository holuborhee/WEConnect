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
      errors: {
        fullname: [], phone: [], email: [], password: [], passwordAgain: [],
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  validateForm() {
    const { errors, formInput } = this.state;

    // Loop through all form fields to check for required
    for (const prop in formInput) {
      if (!formInput[prop]) {
        errors[prop].push('This field is required');
      }
    }

    // Check if Password Fields match
    if (formInput.password !== formInput.passwordAgain) {
      errors.passwordAgain.push('The two Password Fields are not the same');
    }

    this.setState({ errors });
  }

  handleInputChange(e) {
    const target = e.target;
    const { formInput, errors } = this.state;

    errors[target.name].shift();
    formInput[target.name] = target.value;
    this.setState({ formInput, errors });
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
        <TextField className="w-100" name="fullname" errorText={this.state.errors.fullname[0]} value={fullname} onChange={this.handleInputChange} floatingLabelText="Enter your full name" required />
        <TextField className="w-100" name="phone" value={phone} errorText={this.state.errors.phone[0]} onChange={this.handleInputChange} floatingLabelText="Enter your phone number" required type="text" />
        <TextField className="w-100" name="email" value={email} errorText={this.state.errors.email[0]} onChange={this.handleInputChange} floatingLabelText="Enter your email address" required type="email" />
        <TextField className="w-100" name="password" value={password} errorText={this.state.errors.password[0]} onChange={this.handleInputChange} floatingLabelText="Choose a password" required type="password" />
        <TextField className="w-100" name="passwordAgain" value={passwordAgain} errorText={this.state.errors.passwordAgain[0]} onChange={this.handleInputChange} floatingLabelText="Confirm the above password" required type="password" />
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
