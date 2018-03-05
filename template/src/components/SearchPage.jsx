import React from 'react';
import Paper from 'material-ui/Paper';
import SearchBar from './SearchBar.jsx';


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
        <Paper>filter</Paper>
        <main className="main">
    			Content
        </main>
      </section>
    );
  }
}

export default SearchPage;
