import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import Food from './images/food.jpg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Navbar from './NavBar.jsx';
// import LogIn from './Login.jsx';
import LandingPage from './components/LandingPage.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    const images = { food: Food };
    this.state = { curr: <LandingPage images={images} />, isLoggedIn: false };
  }

  render() {
    return (
      <MuiThemeProvider>
        <section className="flex column-flex h-100 justify-space-between">
          {this.state.curr}
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
