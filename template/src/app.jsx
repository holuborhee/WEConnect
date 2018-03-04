import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import Food from './images/food.jpg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/NavBar.jsx';
import LogIn from './components/Login.jsx';
import LandingPage from './components/LandingPage.jsx';
import SearchPage from './components/SearchPage.jsx';


const BusinessDetail = () => (
  <h1>Create a new Business - <strong>Not yet Implemented</strong></h1>
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

class App extends React.Component {
  constructor(props) {
    super(props);
    const images = { food: Food };
    this.routeTo = this.routeTo.bind(this);
    this.state = { currentPage: 'HOME', isLoggedIn: false };

    this.pages = {
      HOME: <LandingPage images={images} onNavigate={this.routeTo} />,
      LOGIN: <LogIn active="a" />,
      SIGNUP: <LogIn active="b" />,
      BUSINESS_PAGE: <BusinessDetail />,
      SEARCH: <SearchPage />,
      EDIT_BUSINESS: <EditBusiness />,
      CREATE_BUSINESS: <NewBusiness />,
    };
  }

  routeTo(page) {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <MuiThemeProvider>
        <section className="flex column-flex h-100 justify-space-between">
          <Navbar isLoggedIn={this.state.isLoggedIn} currentPage={this.state.currentPage} onRoute={this.routeTo} />
          {this.pages[this.state.currentPage]}
          <footer className="bg-primary flex justify-space-between justify-space-evenly">
            <p><a href="#" className="small">Register your Business</a></p>
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
