
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
    let message = 'You requested for all businesses';
    if (q) { message += ` with name as ${q}`; }
    if (location) { message += ` in ${location}`; }
    if (category) { message += ` under ${category}`; }

    return res.status(200).send({
      message,
      error: false,
    });
  }


  /**
   * Register a new business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static create(req, res) {
    const {
      name,
    } = req.body;

    if (!req.body.name) {
      return res.status(400).send({
        message: 'Business Name Missing',
        error: true,
      });
    }


    return res.status(201).send({
      message: `You want to create a business with name as ${name}`,
      error: false,
    });
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

    res.status(200).send({
    	message: `You want to update business with id of ${id}`,
    	error: false,
    });
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

    res.status(200).send({
    	message: `Return details of business with id of ${id}`,
    	error: false,
    });
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
