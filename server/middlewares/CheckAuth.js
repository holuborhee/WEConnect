import jwt from 'jsonwebtoken';
import models from '../models';

const { Business } = models;

class CheckAuth {
  static authenticated(req, res, next) {
    try {
    	const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).send({ staus: 'error', message: 'Authentication failed' });
    }
  }

  static authorized(req, res, next) {
    return Business.findById(req.params.businessId)
      .then((business) => {
        	if (business.userId === parseInt(req.userData.id, 10)) {
        		 next();
        	} else {
        		return res.status(403).send({
            status: 'error', message: 'You are not authorized to peform this action',
          });
        	}
      })
      .catch((err) => {
      	console.log(err);
      	res.status(500).send({ staus: 'error', message: 'There was an internal server error' });
  		});
  }
}

export default CheckAuth;
