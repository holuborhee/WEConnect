import React from 'react';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/file/folder';

class Navbar extends React.Component {
  constructor(props) {
  	super(props);

    this.handleNavigation = this.handleNavigation.bind(this);

    this.AuthBar = (
      <nav className="nav">
        <a href="#">
          <Avatar icon={<Person />} />
        </a>
      </nav>
    );

    this.LogInBar = (
      <nav className="nav">
        <a href="#" onClick={this.handleNavigation}>Login</a>
        <a href="#" onClick={this.handleNavigation}>Sign Up</a>
      </nav>
    );
  }


  handleNavigation(e) {
    e.preventDefault();
    let page = e.target.text || e.target.textContent;
    page = page.replace(' ', '');
    this.props.onRoute(page.toUpperCase());
  }

  render() {
    return (
      <header className="bg-primary flex flex-end small">
        {this.props.isLoggedIn ? this.AuthBar : this.LogInBar}
      </header>
    );
  }
}

export default Navbar;
