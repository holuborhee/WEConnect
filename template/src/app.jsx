import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import Food from './images/food.jpg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/NavBar.jsx';
import LogIn from './components/Login.jsx';
import LandingPage from './components/LandingPage.jsx';
import SearchPage from './components/SearchPage.jsx';
import BusinessPage from './components/BusinessPage.jsx';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const EditBusiness = () => (
  <section className="mxy-auto" id="login-board">
    <h1>MARY KAY FASHION</h1>
    <form >
      <TextField className="w-100" value="Mary Kay Fashion" floatingLabelText="Business Name" />
      <TextField className="w-100" value="08164488989" floatingLabelText="Enter Phone Number" />
      <TextField className="w-100" value="marykayfashion.com.ng" floatingLabelText="Provide your website here" />
      <TextField className="w-100" value="Fashion" floatingLabelText="Enter category of Business" />
      <TextField className="w-100" floatingLabelText="Enter your Location" />
      <TextField className="w-100" floatingLabelText="Enter your opening hours" />
      <FlatButton
        className="w-100"
        backgroundColor="#a4c639"
        label="UPDATE BUSINESS"
      />
    </form>
  </section>
);

const NewBusiness = () => (
  <section className="mxy-auto" id="login-board">
    <h1>Enter Business Details</h1>
    <form >
      <TextField className="w-100" floatingLabelText="Business Name" />
      <TextField className="w-100" floatingLabelText="Enter Phone Number" />
      <TextField className="w-100" floatingLabelText="Provide your website here" />
      <TextField className="w-100" floatingLabelText="Enter category of Business" />
      <TextField className="w-100" floatingLabelText="Enter your Location" />
      <TextField className="w-100" floatingLabelText="Enter your opening hours" />
      <FlatButton
        className="w-100"
        backgroundColor="#a4c639"
        label="REGISTER BUSINESS"
      />
    </form>
  </section>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    const images = { food: Food };
    this.routeTo = this.routeTo.bind(this);
    this.state = {
      currentPage: 'HOME', isLoggedIn: false, fillHeight: { height: '100%' }, autoHeight: { minHeight: '80%' },
    };

    this.pages = {
      HOME: <LandingPage images={images} onNavigate={this.routeTo} />,
      LOGIN: <LogIn active="a" onLogIn={() => this.setState({ isLoggedIn: !this.state.isLoggedIn })} />,
      SIGNUP: <LogIn active="b" />,
      BUSINESS_PAGE: <BusinessPage onNavigate={this.routeTo} />,
      SEARCH: <SearchPage onNavigate={this.routeTo} />,
      EDIT_BUSINESS: <EditBusiness />,
      CREATE_BUSINESS: <NewBusiness />,
    };
  }


  routeTo(page) {
    this.setState({ currentPage: page });
  }

  render() {
    const isToFillHeight = this.state.currentPage === 'HOME' || this.state.currentPage === 'LOGIN' || this.state.currentPage === 'SIGNUP' || this.state.currentPage === 'CREATE_BUSINESS' || this.state.currentPage === 'EDIT_BUSINESS';

    return (
      <MuiThemeProvider>
        <section className="flex column-flex justify-space-between" style={isToFillHeight ? this.state.fillHeight : this.state.autoHeight}>
          <Navbar isLoggedIn={this.state.isLoggedIn} currentPage={this.state.currentPage} onRoute={this.routeTo} />
          {this.pages[this.state.currentPage]}
          <footer className="bg-primary flex justify-space-between justify-space-evenly">
            <p><a href="#" onClick={(e) => { e.preventDefault(); this.routeTo('CREATE_BUSINESS'); }} className="small">Register your Business</a></p>
            <p>&copy; WeConnect 2018</p>
            <span />
          </footer>
        </section>
      </MuiThemeProvider>
    );
  }
}

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
