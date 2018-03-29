import jwt from 'jsonwebtoken';


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
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      Business.findOne({ where: { id: req.params.id } })
        .then((business) => {
        	if (business && business.userId == req.userData.id) {
        		next();
        	}
        	return res.status(403).send({
            status: 'error', message: 'You are not authorized to peform this action',
          });
        })
        .catch(err => res.status(500).send({ staus: 'error', message: 'There was an internal server error' }));
    } catch (error) {
      return res.status(401).send({ staus: 'error', message: 'Authentication failed' });
    }
  }
}

export default CheckAuth;
