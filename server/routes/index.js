import express from 'express';
import UserController from '../controllers/userController';


const app = express();
// const router = express.Router();


app.route('/user')
  .post(UserController.create)
  .get((req, res) => res.status(200).send({ message: 'Implement function to get all users here' }));

app.route('/user/:id')
  .get(UserController.show);


export default app;
