import React from 'react';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';
import SearchBar from './SearchBar.jsx';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Navbar extends React.Component {
  constructor(props) {
  	super(props);

    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.state = { openMore: false, anchorEl: null };

    this.AuthBar = (
      <nav className="nav">
        <a href="#">
          <Avatar icon={<Person />} onClick={(this.handleMoreClick)} />
          <Popover
            open={this.state.openMore}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleMoreClose}
          >
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </Popover>
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

  handleMoreClick(e){

    /*e.preventDefault();

    this.state.openMore ? this.handleMoreClose : */this.setState({ openMore: true, anchorEl: e.currentTarget });
  }

  handleMoreClose = () => {
    this.setState({openMore: false});
  }


  handleNavigation(e) {
    e.preventDefault();
    let page = e.target.text || e.target.textContent;
    page = page.replace(' ', '');
    page = page === 'WeConnect' ? 'HOME' : page;
    this.props.onRoute(page.toUpperCase());
  }

  render() {
    const isCustomBar = this.props.currentPage === 'HOME' || this.props.currentPage === 'SEARCH';
    return (
      <header className="bg-primary flex justify-space-evenly align-items-center">
        <span>
          {isCustomBar ? '' : <h1 className="logo"><a href="" onClick={this.handleNavigation}>WeConnect</a></h1>}
        </span>
        <span>
          {isCustomBar ? '' : <SearchBar />}
        </span>

        {this.props.isLoggedIn ? this.AuthBar : this.LogInBar}
      </header>
    );
  }
}

export default Navbar;
