import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {curr: <Home />}
		this.routeTo = this.routeTo.bind(this);
	}

	routeTo(e) {
		e.preventDefault();
    	let page = e.target.text;
    	//page = page.replace(' ', '');
    	let p = '';
    	switch(page){
    		case 'LogIn':
    		case 'Register':
    			p = <LogIn />
    			break;
    		case 'New Business':
    			p = <NewBusiness />
    			break;
    		default:
    			p = <Home />
    			break;
    	}

    	this.setState({curr: p});

  	}

	render () {
		return (
		  <MuiThemeProvider>
		  	<div>
		  		<a href="" onClick={this.routeTo}>Home</a>
		  		<a href="" onClick={this.routeTo}>LogIn</a>
		  		<a href="" onClick={this.routeTo}>Register</a>
		  		<a href="" onClick={this.routeTo}>New Business</a> 
		  	 </div>
		  	 {this.state.curr}
		  </MuiThemeProvider>
		);
	}
	
}


const Home = () => (
		<h1>Home</h1>
)

const LogIn = () => (
		<h1>Log In and SignUp Page</h1>
)


const NewBusiness = () => (
		<h1>New Business</h1>
)


ReactDOM.render(
  <App />,
  document.getElementById('app')
);