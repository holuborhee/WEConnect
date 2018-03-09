import React from 'react';


class TextField extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { className: `${this.props.className} w-100 text-field-control` };
  }

  render() {
  	return (
    <div className={this.props.className}>
      <input placeholder={this.props.placeholder} type={this.props.type} className="w-100 text-field-control" />
    </div>
  	);
  }
}

export default TextField;
