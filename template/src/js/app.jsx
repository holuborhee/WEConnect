import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './NavBar.jsx';
import LogIn from './Login.jsx';
import LandingPage from './LandingPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { curr: <LandingPage />, isLoggedIn: false };
  }

  render() {
    return (
      <MuiThemeProvider>
        <section className="container main-body">
          <main>
            {this.state.curr}
          </main>
          <footer>
            This is footer
          </footer>
        </section>
      </MuiThemeProvider>
    );
  }
}

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


/* <AppBar
            title="WEConnect"
            onTitleClick={this.routeTo}
            iconElementRight={this.state.isLoggedIn ? this.AuthBar : this.LogInBar}
            showMenuIconButton={false}
            zDepth={3}
          /> */
