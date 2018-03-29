import express from 'express';
import { BusinessController, AuthController } from '../controllers';
import CheckAuth from '../middlewares/CheckAuth';


const app = express();
// const router = express.Router();


app.route('/businesses')
  .post(CheckAuth.authenticated, BusinessController.create)
  .get(BusinessController.index);


app.route('/businesses/:id')
  .delete(CheckAuth.authorized, BusinessController.destroy)
  .get(BusinessController.show)
  .put(CheckAuth.authorized, BusinessController.update);

app.route('/businesses/:id/reviews')
  .get(BusinessController.allReviews)
  .post(BusinessController.newReview);


app.post('/auth/signup', (req, res) => AuthController.register(req, res));

app.post('/auth/login', AuthController.login);


export default app;
