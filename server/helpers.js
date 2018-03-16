

/* . This file contains functions of general use to the whole of the app, */

class Helper {
  static propsNotIn(obj, props) {
    return props.filter(p => !Object.prototype.hasOwnProperty.call(obj, p));
  }


  static validateRequiredInRequest(requestBody, required) {
    const notFound = Helper.propsNotIn(requestBody, required);
    const response = {};
    if (notFound.length > 0) {
      response.status = 'fail';
      response.data = {};
      /* eslint array-callback-return: "off" */
      notFound.map((el) => {
        response.data[el] = `${el} is required`;
      });
      return response;
    }

    return true;
  }
}

export default Helper;
