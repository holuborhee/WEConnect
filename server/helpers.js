

/* . This file contains functions of general use to the whole of the app, */

class Helper {
	 static propsNotIn(obj, props) {
	 	return props.filter(p => !Object.prototype.hasOwnProperty.call(obj, p));
	 }
}

export default Helper;
