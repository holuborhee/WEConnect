import express from 'express';
import { BusinessController, AuthController } from '../controllers';


const app = express();
// const router = express.Router();

app.route('/')
  .get((req, res) => {
    res.redirect('/docs');
  });

app.route('/businesses')
  .post(BusinessController.create)
  .get(BusinessController.index);


app.route('/businesses/:id')
  .delete(BusinessController.destroy)
  .get(BusinessController.show)
  .put(BusinessController.update);

app.route('/businesses/:id/reviews')
  .get(BusinessController.allReviews)
  .post(BusinessController.newReview);


app.post('/auth/signup', AuthController.register);

app.post('/auth/login', AuthController.login);


export default app;
