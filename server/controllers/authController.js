import User from '../models/user';
import Helper from '../helpers';


const response = { status: 'success' };
/**
  * Authentication Controller
  * @class AuthController
  *
  */
class AuthController {
  /**
      * Registers a new User
      *
      * @param {object} req The request body of the request.
      * @param {object} res The response body.
     * @returns {object} res.
     */
  static register(req, res) {
    const isValid = AuthController.validateRegister(req.body);
    if (isValid) {
      const {
        name, email, phone, password, confirmPassword,
      } = req.body;
      const user = User.add({
        name, email, phone, password, confirmPassword,
      });
      response.status = 'success';
      response.data = { user };
      return res.status(201).send(response);
    } return res.status(422).send(response);
  }

  /**
      * Finds a user by Id
      *
      * @param {object} req The request body of the request.
      * @param {object} res The response body.
     * @returns {object} res.
     */
  static login(req, res) {
    const { email, phone, password } = req.body;
    let user;
    if (!email && !phone) {
      response.status = 'fail';
      response.data = { email: 'There was no email in request', phone: 'There was no phone in request' };
      return res.status(422).send(response);
    } else if (email && phone) {
      user = User.getByEmailAndPassword(email, password);
      /* eslint no-unused-expressions: "off" */
      user.id || (user = User.getByPhoneAndPassword(phone, password));
    } else if (email) {
      user = User.getByEmailAndPassword(email, password);
    } else if (phone) {
      user = User.getByPhoneAndPassword(phone, password);
    }


    response.status = user.id ? 'success' : 'fail';
    response.data = user.id ? { user } : user;
    const status = user.id ? 200 : 401;

    if (!user.id) { user = User.getByPhoneAndPassword(phone, password); }

    return res.status(status).send(response);
  }


  static validateRegister(requestBody) {
    const required = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    const notFound = Helper.propsNotIn(requestBody, required);
    if (notFound.length > 0) {
      response.status = 'fail';
      response.data = {};
      /* eslint array-callback-return: "off" */
      notFound.map((el) => {
        response.data[el] = `${el} is required`;
      });
      return false;
    } else if (requestBody.password !== requestBody.confirmPassword) {
      response.status = 'fail';
      response.data = { confirmPassword: 'Password does not match' };
      return false;
    }

    return true;
  }
}

export default AuthController;


/* const {
      name, phone, email, password, passwordConfirm,
    } = req.body;
    // const user = User.add({ name, address, role });
    if (user) {
      return res.status(201).send({ error: false, user });
    } */
