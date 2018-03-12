import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SearchBar from './SearchBar.jsx';


const categories = [
	  {
	  	id: 1,
	    img: 'food.jpg',
	    title: 'Cuisine & Restaurants',
	  },
	  {
	  	id: 2,
	    img: 'food.jpg',
	    title: 'Co-Working',
	  },
	  {
	  	id: 3,
	    img: 'food.jpg',
	    title: 'Fashion',
	  },
	  {
	  	id: 4,
	    img: 'food.jpg',
	    title: 'Bar',
	  },
	  {
	  	id: 5,
	    img: 'devices.jpg',
	    title: 'Devices & Gadgets',
	  },
	  {
	  	id: 6,
	    img: 'coffee.jpg',
	    title: 'Health and Fitness',
	  },
	  {
	  	id: 7,
	    img: 'devices.jpg',
	    title: 'Education',
	  },
	  {
	  	id: 8,
	    img: 'devices.jpg',
	    title: 'BroadCasting',
	  },
];


const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};


class LandingPage extends React.Component {
  constructor(props) {
  	super(props);

    this.handleCategoryClicked = this.handleCategoryClicked.bind(this);
  }


  handleCategoryClicked() {
    this.props.onNavigate('SEARCH');
  }

  render() {
    return (
      <main className="flex column-flex main">
        <section className="h-50 bg-primary flex column-flex">
          <div id="welcomeSearch" className="mxy-auto flex column-flex w-75 align-items-center">
            <h2>WeConnect</h2>
            <p>WeConnect provides a platform that brings businesses and individuals together</p>
            <SearchBar />
          </div>
        </section>

        <section className="h-50 flex">
          <div className="mxy-auto w-75">
            <h2>Categories</h2>
            <GridList style={styles.gridList} padding={8}>
              {categories.map(tile => (
                <GridTile
                  onClick={this.handleCategoryClicked}
                  key={tile.id}
                  title={tile.title}
                  actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                  titleStyle={styles.titleStyle}
                  titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                >
                  <img src={this.props.images.food} />
                </GridTile>

      		      ))}
            </GridList>
          </div>
        </section>
      </main>
    );
  }
}

export default LandingPage;
