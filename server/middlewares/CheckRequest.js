import Helper from '../Helper';
import models from '../models';
import StringFormatValidation from 'string-format-validation';

const { Business, User } = models;

class CheckRequest {
  static validateRegisterBusiness(req, res, next) {
  	const required = ['name', 'latitude', 'longitude', 'address', 'categoryId'];
  	const allInRequest = Helper.validateRequiredInRequest(req.body, required);
  	if (allInRequest === true) {
  		const {
        name, latitude, longitude, address, categoryId,
      } = req.body;
  		Business.findOne({ where: { userId: req.userData.id } })
  		  .then((business) => {
  		  	if (business) { return res.status(403).send({ status: 'error', message: 'You cannot have more than one business' }); }
  		  	Business.findOne({ where: { name } })
  		  	  .then((business) => {
  		  	  	if (business) { return res.status(422).send({ status: 'fail', data: { name: `${name} already exists` } }); }
  		  	  	next();
  		  	  })
  		  	  .catch(err => res.status(500).send({ status: 'error', message: 'there was an internal server error' }));
  		  })
  		  .catch(err => res.status(500).send({ status: 'error', message: 'there was an internal server error' }));
  	} else {
  		return res.status(422).send(allInRequest);
  	}
  }

  static validateRegisterUser(req, res, next) {
  	const required = ['name', 'phone', 'email', 'password'];
  	const allInRequest = Helper.validateRequiredInRequest(req.body, required);
  	if (allInRequest === true) {
  		const {
        name, email, phone, password,
      } = req.body;
  		if (StringFormatValidation.validate({ type: 'email' }, email)) {
  			User.findOne({ where: { email } })
  			  .then((user) => {
  			  	if (user) { return res.status(422).send({ status: 'fail', data: { email: `${email} is already chosen` } }); }
  			  	next();
  			  })
  			  .catch(err => res.status(500).send({ status: 'error', message: 'there was an internal server error' }));
  		} else return res.status(422).send({ status: 'fail', data: { email: `${email} is not a valid email address` } });
  	} else {
  		return res.status(422).send(allInRequest);
  	}
  }

  static validateNewReview(req, res, next) {
  	const required = ['reviewer', 'rating', 'comment'];
  	const allInRequest = Helper.validateRequiredInRequest(req.body, required);
  	if (allInRequest === true) {
  		next();
  	} else {
  		return res.status(422).send(allInRequest);
  	}
  }


  static validateLogin(req, res, next) {
  	const allInRequest = Helper.validateRequiredInRequest(req.body, ['email', 'password']);
  	if (allInRequest === true) {
  		const {
        email, password,
      } = req.body;
  		if (StringFormatValidation.validate({ type: 'email' }, email)) {
  		 next();
   		} else return res.status(422).send({ status: 'fail', data: { email: `${email} is not a valid email address` } });
  	} else {
  		return res.status(422).send(allInRequest);
  	}
  }

  static validateParam(req, res, next) {
    if (StringFormatValidation.validate({ type: 'number' }, req.params.id)) {
    	next();
    } else return res.status(400).send({ status: 'error', message: 'Server cannot understand this request' });
  }
}


export default CheckRequest;
