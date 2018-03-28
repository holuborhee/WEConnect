import models from '../models';
import Helper from '../Helper';
import Sequelize from 'sequelize';


const { Op } = Sequelize;


const response = { status: 'success' };
let status;


const { Business, Review } = models;
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
    const { search, location, category } = req.query;
    let condition = {};
    if (!category ^ !location) {
      condition = {
        where: {
          [Op.or]: [
            {
              categoryId: {
                [Op.eq]: category,
              },
            }, {
              address: {
                [Op.like]: `%${location}%`,
              },
            },
          ],
        },
      };
    } else if (category && location) {
      condition = {
        where: {
          [Op.and]: [
            {
              categoryId: {
                [Op.eq]: category,
              },
            }, {
              address: {
                [Op.like]: `%${location}%`,
              },
            },
          ],
        },
      };
    }
    return Business.findAll(condition)
      .then(businesses => res.status(200).send({ status: 'success', data: { businesses } }))
      .catch(error => res.status(400).send({ error }));


    /* if (location) { businesses = Business.at(location, businesses); }
    if (category) { businesses = Business.under(category, businesses); }
    response.data = { businesses };
    return res.status(200).send(response); */
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
    return Business.findById(id)
      .then((business) => {
        return business ? res.status(200).send({ status: 'success', data: { business } }) : res.status(404).send({ status: 'fail', data: { id: `No resource could be found for ${id} on the server` } });
        done();
      }).catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
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

  	return Business.findById(id)
      .then((business) => {
        if (business) {
          business.destroy()
            .then(() => res.status(200).send({ status: 'success', data: null }))
            .catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
        } else return res.status(404).send({ status: 'fail', data: { id: `No resource could be found for ${id} on the server` } });
      })
      .catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
  }

  static allReviews(req, res) {
    const { id } = req.params;

    Business.findById(id)
      .then((business) => {
        if (business) {
          Review.findAll({ where: { businessId: business.id } })
            .then(reviews => res.status(200).send({ status: 'success', data: { reviews } }));
        } else return res.status(404).send({ status: 'fail', data: { id: `No resource could be found for ${id} on the server` } });
      });
  }

  static newReview(req, res) {
    const { id } = req.params;

    const business = Business.find(id);
    if (business) {
      /* Implementation here will be refractored to a ReviewController */
      const required = ['reviewer', 'comment', 'rating'];
      const resp = Helper.validateRequiredInRequest(req.body, required);
      if (resp !== true) {
        response.data = resp.data;
        response.status = resp.status;
        status = 422;
      } else {
        const { reviewer, comment, rating } = req.body;
        const review = business.review.add({ reviewer, comment, rating });
        response.data = { review };
        response.status = 'success';
        status = 201;
      }
    } else {
      response.data = { id: `No resource could be found for ${id} on the server` };
      response.status = 'fail';
      status = 404;
    }

    return res.status(status).send(response);
  }
}

export default BusinessController;
