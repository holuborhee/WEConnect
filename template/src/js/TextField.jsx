import React from 'react';
import Paper from 'material-ui/Paper';


class TextField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
    <paper>
      <input type={props.type} />;
    </paper>
  	);
  }
}
