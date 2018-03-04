import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import Food from './images/food.jpg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/NavBar.jsx';
// import LogIn from './Login.jsx';
import LandingPage from './components/LandingPage.jsx';

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

const Search = () => (
  <h1>All Businesses - <strong>Not yet Implemented</strong></h1>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    const images = { food: Food };
    this.state = { currentPage: 'SEARCH', isLoggedIn: false };
    this.pages = {
      HOME: <LandingPage images={images} />,
      BUSINESS_PAGE: <BusinessDetail />,
      SEARCH: <Search />,
      EDIT_BUSINESS: <EditBusiness />,
      CREATE_BUSINESS: <NewBusiness />,
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <section className="flex column-flex h-100 justify-space-between">
          <NavBar />
          {this.pages[this.state.currentPage]}
          <footer className="bg-primary flex justify-center">
            <p>&copy; WeConnect 2018</p>
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
