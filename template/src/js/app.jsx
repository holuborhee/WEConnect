import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LogIn from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { curr: <Home />, isLoggedIn: false };
    this.routeTo = this.routeTo.bind(this);

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
    );
  }

  handleLogin() {
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
    			p = <Home />;
    			break;
    	}

    	this.setState({ curr: p });
  	}

  render() {
    return (
      <MuiThemeProvider>
        <section className="container main-body">
          <AppBar
            title="WEConnect"
            onTitleClick={this.routeTo}
            iconElementRight={this.state.isLoggedIn ? this.AuthBar : this.LogInBar}
            showMenuIconButton={false}
            zDepth={3}
          />
          <main>
            {this.state.curr}
          </main>
        </section>
        <footer>
		  This is footer
        </footer>
      </MuiThemeProvider>
    );
  }
}


const Home = () => (
  <h1>Landing Page - <strong>Not yet Implemented</strong></h1>
);

const BusinessDetail = () => (
  <h1>Create a new Business - <strong>Not yet Implemented</strong></h1>
);

const Search = () => (
  <h1>All Businesses - <strong>Not yet Implemented</strong></h1>
);


const EditBusiness = () => (
  <h1>Edit A Business - <strong>Not yet Implemented</strong></h1>
);

const NewBusiness = () => (
  <h1>Create a new Business - <strong>Not yet Implemented</strong></h1>
  /*
	Name
	Logo
	Cover Picture
	Slogan
	Average Rating
	Location
	About

  */
);


ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
