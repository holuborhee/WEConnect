import db from '../db';
import Helper from '../helpers';

const { users } = db;
class User {
  static add(props) {
    const user = props;
    const required = ['name', 'phone', 'email', 'password'];
    if (Helper.propsNotIn(user, required).length > 0) { return null; }
    user.id = users.length + 1;
    users.push(user);
    return user;
  }

  static find(id) {
    const i = parseInt(id, 10);
    const user = users.find(u => u.id === i);
    return user;
  }

  static all() {
  	return users;
  }
}

export default User;
