import Database from "./Database.js";
import createHashAndSaltPassword from "../utils/createHashAndSaltPassword.js";

class UserDb extends Database {
  constructor (userList) {
    super();
    this.userList = userList;
  }

  #getUserList() {
    return this.userList = this.database.collection('users');
  }

  registerUser({ user, password }) {
    const { hashPassword, saltPassword } = createHashAndSaltPassword(password);

    return this.#getUserList().insertOne({ user, hashPassword, saltPassword });
  }

  findUser(user) {
    return this.#getUserList().findOne({ user: user });
  }
}

export default UserDb;