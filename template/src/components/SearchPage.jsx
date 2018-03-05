import React from 'react';
import Paper from 'material-ui/Paper';
import SearchBar from './SearchBar.jsx';

import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


const style = {
  margin: '12px',
};


class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openPop: false };

    this.handleMoreClick = this.handleMoreClick.bind(this);
  }


  handleMoreClick(event) {
  	event.preventDefault();

  	this.state.openPop ? this.handleMoreClose : this.setState({ openPop: true, anchorEl: event.currentTarget });
  }

  handleMoreClose = () => {
    this.setState({
      openPop: false,
    });
  };

  render() {
  	return (
    <Paper className="flex justify-space-evenly">
      <span className="flex w-50 justify-space-evenly align-items-center">
        <p className="small" >Filter</p>
        <span className="flex justify-space-around">
          {
  	          	[1, 2, 3, 4].map(i => (
    <RaisedButton
      backgroundColor="#f2f2f2"
      icon={<ActionAndroid />}
      style={style}
      key={i}
    />
  	          	))
  	          }
        </span>
        <span style={{ alignSelf: 'center' }}>
          <RaisedButton
            onClick={this.handleMoreClick}
            label="More"
          />
          <Popover
            open={this.state.openPop}
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
        </span>
      </span>

      <span />
    </Paper>
  	);
  }
}


class SearchPage extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {
    return (
      <section className="main flex column-flex">
        <div id="search-area" className="bg-primary flex justify-space-evenly align-items-center">
          <span><h1 className="logo"><a href="" onClick={() => this.props.onNavigate('HOME')}>WeConnect</a></h1></span>
          <span><SearchBar /></span>
          <nav />
        </div>
        <Filter />
        <main className="main">
    			Content
        </main>
      </section>
    );
  }
}

export default SearchPage;
