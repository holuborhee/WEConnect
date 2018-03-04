import React from 'react';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/file/folder';
import SearchBar from './SearchBar.jsx';

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
      <nav className="nav small">
        <a href="#" onClick={this.handleNavigation}>Login</a>
        <a href="#" onClick={this.handleNavigation}>Sign Up</a>
      </nav>
    );
  }


  handleNavigation(e) {
    e.preventDefault();
    let page = e.target.text || e.target.textContent;
    page = page.replace(' ', '');
    page = page === 'WeConnect' ? 'HOME' : page;
    this.props.onRoute(page.toUpperCase());
  }

  render() {
    return (
      <header className="bg-primary flex justify-space-between align-items-center">
        <span>
          {this.props.currentPage !== 'HOME' ? <h1 className="logo"><a href="" onClick={this.handleNavigation}>WeConnect</a></h1> : ''}
        </span>
        <span>
          {this.props.currentPage !== 'HOME' ? <SearchBar /> : ''}
        </span>

        {this.props.isLoggedIn ? this.AuthBar : this.LogInBar}
      </header>
    );
  }
}

export default Navbar;
