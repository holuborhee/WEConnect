import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from './TextField.jsx';
import FlatButton from 'material-ui/FlatButton';
import Search from 'material-ui/svg-icons/action/search';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zDepth: 1 };

    this.handleMouse = this.handleMouse.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
  }

  handleMouse() {
  	this.setState({ zDepth: 4 });
  }

  handleLeft() {
  	this.setState({ zDepth: 1 });
  }
  render() {
  	return (
    <Paper className="search-box" onMouseOver={this.handleMouse} onMouseLeave={this.handleLeft} zDepth={this.state.zDepth}>
      <TextField type="text" placeholder="Search for a business or service" className="search-value" />
      <TextField type="search" placeholder="Choose a location" className="location" />
      <FlatButton
        backgroundColor="#a4c639"
        icon={<Search color="#ffffff" />}
        fullWidth
      />
    </Paper>
  	);
  }
}


export default SearchBar;
