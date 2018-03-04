import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
  	super(props);

  	/* this.routeTo = this.routeTo.bind(this);

    this.handleLogin = this.handleLogin.bind(this);

    this.LogInBar = (<span>
      <FlatButton
        onClick={this.routeTo}
        label="LogIn"
      />

      <FlatButton
        onClick={this.routeTo}
        label="Register"
        style={{ marginLeft: '5px' }}
      />
    </span>);
    this.AuthBar = (
      <span>
        <FlatButton onClick={this.routeTo} label="New Business" />
        <FlatButton onClick={this.handleLogin} label="Log out" style={{ marginLeft: '5px' }} />
      </span>
    ); */
  }


  /* handleLogin() {
  	this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  routeTo(e) {
    	const page = e.target.text || e.target.textContent;
    	// page = page.replace(' ', '');
    	let p = '';
    	switch (page) {
    		case 'LogIn':
    			p = <LogIn active="a" onLogIn={this.handleLogin} />;
    			break;
    		case 'Register':
    			p = <LogIn active="b" onLogIn={this.handleLogin} />;
    			break;
    		case 'New Business':
    			p = <NewBusiness />;
    			break;
    		default:
    			p = <LandingPage />;
    			break;
    	}

    	this.setState({ curr: p });
  	} */

  render() {
    return this.props.isLoggedIn ? <p>I am Logged In</p> : <p>I am not Logged in</p>;
  }
}
