import express from 'express';
import { BusinessController, AuthController } from '../controllers';
import CheckAuth from '../middlewares/CheckAuth';
import CheckRequest from '../middlewares/CheckRequest';

const app = express();
// const router = express.Router();


app.route('/businesses')
  .post(CheckAuth.authenticated, CheckRequest.validateRegisterBusiness, BusinessController.create)
  .get(BusinessController.index);


app.route('/businesses/:id')
  .delete(CheckAuth.authorized, CheckRequest.validateParam, BusinessController.destroy)
  .get(CheckRequest.validateParam, BusinessController.show)
  .put(CheckAuth.authorized, CheckRequest.validateParam, BusinessController.update);

app.route('/businesses/:id/reviews')
  .get(CheckRequest.validateParam, BusinessController.allReviews)
  .post(CheckRequest.validateNewReview, CheckRequest.validateParam, BusinessController.newReview);


app.post('/auth/signup', CheckRequest.validateRegisterUser, (req, res) => AuthController.register(req, res));

app.post('/auth/login', CheckRequest.validateLogin, AuthController.login);


export default app;
