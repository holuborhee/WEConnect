import Business from '../models/business';
import Helper from '../helpers';


const response = { status: 'success' };
let status;
/**
  * Business Controller
  * @class BusinessController
  * */
class BusinessController {
  /**
   * Return list of businesses
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static index(req, res) {
    const { q, location, category } = req.query;
    let businesses = Business.all();
    if (q) { businesses = Business.nameHas(q); }
    if (location) { businesses = Business.at(location, businesses); }
    if (category) { businesses = Business.under(category, businesses); }
    status = 200;
    response.data = { businesses };
    return res.status(status).send(response);
  }


  /**
   * Register a new business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static create(req, res) {
    const required = ['name', 'user', 'category', 'latitude', 'longitude', 'address'];
    const resp = Helper.validateRequiredInRequest(req.body, required);
    if (resp !== true) {
      response.data = resp.data;
      response.status = resp.status;
      status = 422;
    } else {
      const {
        name, user, category, latitude, longitude, address,
      } = req.body;
      const business = Business.add({
        name, user, category, latitude, longitude, address,
      });
      response.data = { business };
      response.status = 'success';
      status = 201;
    }


    return res.status(status).send(response);
  }

  /**
   * Update a business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static update(req, res) {
    const { id } = req.params;

    let business = Business.find(id);
    if (business) {
      business = business.modify(req.body);
      response.data = { business };
      response.status = 'success';
      status = 200;
    } else {
      response.data = { id: `No resource could be found for ${id} on the server` };
      response.status = 'fail';
      status = 404;
    }


    return res.status(status).send(response);
  }


  /**
   * Get details of a business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static show(req, res) {
  	const { id } = req.params;
    const business = Business.find(id);
    response.data = business ? { business } : { id: `No resource could be found for ${id} on the server` };
    response.status = business ? 'success' : 'fail';
    status = business ? 200 : 404;
    return res.status(status).send(response);
  }


  /**
  	*Delete a specified resource
  	*
  	* @param {object} req The request body.
  	* @param {object} res The response body.
  	* @returns {object} res.
  	*/
  static destroy(req, res) {
  	const { id } = req.params;

  	res.send(204).send(`You want to delete business with id of ${id}`);
  }
}

export default BusinessController;
