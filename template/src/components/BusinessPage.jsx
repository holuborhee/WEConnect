import React from 'react';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Time from 'material-ui/svg-icons/device/access-time';
import Phone from 'material-ui/svg-icons/communication/call';
import Link from 'material-ui/svg-icons/content/link';
import Location from 'material-ui/svg-icons/communication/location-on';
import Paper from 'material-ui/Paper';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import Camera from 'material-ui/svg-icons/image/photo-camera';
import Favorite from 'material-ui/svg-icons/action/favorite';
import RaisedButton from 'material-ui/RaisedButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import StarHalf from 'material-ui/svg-icons/toggle/star-half';
import Star from 'material-ui/svg-icons/toggle/star';
import { GridList, GridTile } from 'material-ui/GridList';
import Device from '../images/devices.jpg';
import Cover from '../images/cover.jpg';


class BusinessPage extends React.Component {
  constructor(props) {
	 super(props);
  }

  render() {
  	return (
    <main>
      <div>
        <img style={{ width: '100%', height: '300px' }} src={Cover} />
      </div>
      <section className="main mxy-auto container ">
        <div className="flex">
          <div className="flex w-50 justify-space-between" style={{ position: 'relative' }}>
            <Paper
              className="flex"
              style={{
 position: 'absolute', top: '-80', width: '150px', height: '150px',
}}
            >
              <div className="mxy-auto text-center">
                <Camera />
                <h6>Add Photo</h6>
              </div>
            </Paper>
            <h3 style={{ marginLeft: '180px' }}>Mary Kay Fashion</h3>
            <p>Fashion</p>
          </div>
          <div />
        </div>
        <section className="flex">
          <main className="main" style={{ }}>

            <div style={{ borderRight: '1px solid black', paddingRight: '20px' }}>
              <div style={{ marginLeft: '180px' }}>
                <RaisedButton backgroundColor="#f2f2f2" label="Write a review" />
                <RaisedButton
                  backgroundColor="#f2f2f2"
                  icon={<Favorite />}
                  style={{ margin: '12px' }}
                />
                <span>
                  <Star />
                  <Star />
                  <Star />
                  <StarHalf />
                  <StarBorder />
                </span>
              </div>
              <Divider />
              <section style={{ padding: '3%' }}>
                <GridList
                  style={{
 display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', width: '500px',
}}
                  padding={8}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <GridTile
                      key={i}
                    >
                      <img src={Device} />
                    </GridTile>

    			      ))}
                </GridList>
              </section>
              <Divider />
              <div>Reviews</div>
            </div>
            <div>New Revuew</div>
          </main>
          <aside style={{ marginLeft: '20px' }}>
            <Paper>
              <List>
                <ListItem leftIcon={<Time />} >
                  <span><strong>Mon - Fri</strong> 9:00am - 5:00pm</span>
                  <p><strong>Saturdays</strong> 9:00am - 4:00pm</p>
                </ListItem>
                <ListItem primaryText="08164488989" leftIcon={<Phone />} />
                <ListItem primaryText="marykayfashion.com.ng" leftIcon={<Link />} />
              </List>
            </Paper>

            <Card>

              <CardMedia >
                <p>Mao here</p>
              </CardMedia>
              <CardText className="flex">
                <Location /> <span>Block 1, Admirality Way, Lekki Phase 1, Lagos, Nigeria.</span>
              </CardText>
            </Card>
          </aside>
        </section>

      </section>
    </main>
  	);
  }
}

export default BusinessPage;
