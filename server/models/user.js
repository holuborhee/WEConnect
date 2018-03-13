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

  static getByEmailAndPassword(email, password) {
    const user = User.getByEmail(email);
    if (user) {
      if (user.password === password) {
        return user;
      } return { password: `${password} isn't matching for the user` };
    }

    return { email: `${email} doesn't match any email on server` };
  }


  static getByPhoneAndPassword(phone, password) {
    const user = User.getByPhone(phone);
    if (user) {
      if (user.password === password) {
        return user;
      } return { password: `${password} isn't matching for the user` };
    }

    return { phone: `${phone} doesn't match any phone on server` };
  }

  static getByEmail(email) {
    return users.find(u => u.email === email);
  }

  static getByPhone(phone) {
    return users.find(u => u.phone === phone);
  }

  static all() {
  	return users;
  }
}

export default User;
