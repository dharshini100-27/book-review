const users = [];

function isValid(username) {
  return !users.find(user => user.username === username);
}

function authenticate(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

module.exports = { users, isValid, authenticate };
