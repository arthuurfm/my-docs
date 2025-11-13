import Database from "./Database.js";

class UserDb extends Database {
  constructor (userList) {
    super();
    this.userList = userList;
  }

  #getUserList() {
    return this.userList = this.database.collection('users');
  }

  registerUser({ user, password }) {
    return this.#getUserList().insertOne({ 
      user: user, 
      password: password 
    });
  }

  findUser(user) {
    return this.#getUserList().findOne({ user: user });
  }
}

export default UserDb;