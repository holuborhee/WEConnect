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
    const {
      name, latitude, longitude, address, categoryId,
    } = req.body;

    return Business.create({
      name, latitude, longitude, address, categoryId, userId: 11,
    }).then(business => res.status(201).send({ status: 'success', data: { business } }))
      .catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
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

    return Business.findById(id)
      .then((business) => {
        if (business) {
          const {
            name, latitude, longitude, address, categoryId,
          } = req.body;
          business.update({
            name: name || business.name,
            latitude: latitude || business.latitude,
            longitude: longitude || business.longitude,
            address: address || business.address,
            categoryId: categoryId || business.categoryId,
          })
            .then(business => res.status(200).send({ status: 'success', data: { business } })).catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
        } else return res.status(404).send({ status: 'fail', data: { id: `No resource could be found for ${id} on the server` } });
      })
      .catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
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
        if (business) {
          return res.status(200).send({ status: 'success', data: { business } });
        } return res.status(404).send({ status: 'fail', data: { id: `No resource could be found for ${id} on the server` } });
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
            .then(reviews => res.status(200).send({ status: 'success', data: { reviews } }))
            .catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
        } else return res.status(404).send({ status: 'fail', data: { id: `No resource could be found for ${id} on the server` } });
      }).catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
  }

  static newReview(req, res) {
    const { id } = req.params;

    Business.findById(id)
      .then((business) => {
        if (business) {
          const { reviewer, comment, rating } = req.body;
          Review.create({
            reviewer, comment, rating, businessId: business.id,
          })
            .then(review => res.status(201).send({ status: 'success', data: { review } }))
            .catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
        } else return res.status(404).send({ status: 'fail', data: { id: `No resource could be found for ${id} on the server` } });
      }).catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
  }
}

export default BusinessController;
