import User from '../models/user';

/**
  * Authentication Controller
  * @class AuthController
  *
  */
class UserController {
  /**
      * Registers a new User
      *
      * @param {object} req The request body of the request.
      * @param {object} res The response body.
     * @returns {object} res.
     */
  static create(req, res) {
    const { name, address, role } = req.body;
    const user = User.add({ name, address, role });
    if (user) {
      return res.status(201).send({ error: false, user });
    }

    return res.status(400).send({ error: true, message: 'The request sent is a bad one', request: req });
  }

  /**
      * Finds a user by Id
      *
      * @param {object} req The request body of the request.
      * @param {object} res The response body.
     * @returns {object} res.
     */
  static show(req, res) {
    const { id } = req.body;
    const user = User.find(id);
    if (user) {
      return res.status(201).send({ error: false, user });
    }

    return res.status(404).send({ error: true, message: 'User not found on server', request: req });
  }
}

export default UserController;
