import React from 'react';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/file/folder';

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

    this.AuthBar = (
      <nav className="nav">
        <a href="#">
          <Avatar icon={<Person />} />
        </a>
      </nav>
    );

    this.LogInBar = (
      <nav className="nav">
        <a href="#">Login</a>
        <a href="#">Sign Up</a>
      </nav>
    );
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
    return (
      <header className="bg-primary flex flex-end small">
        {this.props.isLoggedIn ? this.AuthBar : this.LogInBar}
      </header>
    );
  }
}

export default Navbar;
