import express from 'express';
import { BusinessController, AuthController } from '../controllers';


const app = express();
// const router = express.Router();


app.route('/businesses')
  .post(BusinessController.create)
  .get(BusinessController.index);


app.route('/businesses/:id')
  .delete(BusinessController.destroy)
  .get(BusinessController.show)
  .put(BusinessController.update);

app.route('/businesses/:id/reviews')
  .get((req, res) => res.json({ message: `This is to get all reviews of business with id of ${req.params.id}` }))
  .post((req, res) => res.json({ message: `This is to post a new review for business with id of ${req.params.id}` }));


app.post('/auth/signup', AuthController.register);

app.post('/auth/login', AuthController.login);


export default app;
