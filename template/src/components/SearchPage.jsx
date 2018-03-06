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
        <span>
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

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Cover from '../images/cover.jpg';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import StarHalf from 'material-ui/svg-icons/toggle/star-half';
import Star from 'material-ui/svg-icons/toggle/star';


const BusinessCard = (props) => (


	<Card onClick={()=>props.onClick()} className="business-card" style={{width: '250px', height: 'auto', marginBottom: '30px'}}>
	    <CardMedia
	    >
	      <img src={Cover} alt="" />
	    </CardMedia>
	    <CardTitle title={props.name} />
	    <CardText>
	      <Star />
	    	<Star />
	    	<Star />
	    	<StarHalf />
	      	<StarBorder />
	    </CardText>
	</Card>

)


const Businesses = [
	{
		id: 1,
		name: 'Mary Kay Fashion'
	},
	{
		id: 2,
		name: 'Shade Couture'
	},
	{
		id: 3,
		name: 'Glady\'s Wears'
	},
	{
		id: 4,
		name: 'M&G Fashion'
	},
	{
		id: 5,
		name: 'M&G Fashion'
	},
	{
		id: 6,
		name: 'Mary Kay Fashion'
	},
	{
		id: 7,
		name: 'Shade Couture'
	},
	{
		id: 8,
		name: 'Shade Couture'
	},
	{
		id: 9,
		name: 'Glady\'s Wears'
	},
	{
		id: 10,
		name: 'Glady\'s Wears'
	},
	{
		id: 11,
		name: 'M&G Fashion'
	},
	{
		id: 12,
		name: 'Mary Kay Fashion'
	},


]


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
        <main className="mxy-auto container">
        	<h5>Showing result for Fashion Businesses in Lagos</h5>
    		<div className="flex justify-space-between wrap">
    			{ Businesses.map(business=><BusinessCard  onClick={()=>this.props.onNavigate('BUSINESS_PAGE')} key={business.id} {...business} />) }
    		</div>
        </main>
      </section>
    );
  }
}

export default SearchPage;
