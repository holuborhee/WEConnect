import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models';
import Helper from '../Helper';


const { User } = models;

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
    const {
      name, email, phone, password,
    } = req.body;

    return User.create({
      name, phone: phone.trim(), email: email.trim().toLowerCase(), password: `${bcrypt.hashSync('password', 10)}`,
    })
      .then((user) => {
        const {
          id, name, phone, email,
        } = user;
        return res.status(201).send({ status: 'success', data: { user: { name, phone, email } } });
      })
      .catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
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

    return User.findOne({ where: { email } })
      .then((user) => {
        if (!user) { return res.status(401).send({ status: 'error', message: 'Authentication failed' }); }
        if (!AuthController.comparePassword(password, user.password)) { return res.status(401).send({ status: 'error', message: 'Authentication failed' }); }
        const _token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
        const {
          id, name, phone, email,
        } = user;
        return res.status(200).send({
          status: 'success',
          data: {
            _token,
            user: {
              id, name, phone, email,
            },
          },
        });
      })
      .catch(err => res.status(500).send({ status: 'error', message: 'There was an internal server error' }));
  }

  static comparePassword(reqPassword, dbPassword) {
    return bcrypt.compareSync(reqPassword, dbPassword);
    // if (!isValid) { return res.status(401).send({ status: 'error', message: 'Authentication failed' }); }
    // return res.status(200).send({ status: 'success', message: 'Authentication successful' });
  }


  static validateRegister(requestBody) {
    const required = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    const resp = Helper.validateRequiredInRequest(requestBody, required);
    if (resp !== true) {
      response.status = resp.status;
      response.data = resp.data;
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
