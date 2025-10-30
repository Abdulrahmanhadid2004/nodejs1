const bcrypt = require('bcryptjs');

let users = []; // { username, passwordHash }

async function register(username, password) {
  const existing = users.find(u => u.username === username);
  if (existing) throw new Error('User already exists.');
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash: hash });
  return { username };
}

async function login(username, password) {
  const user = users.find(u => u.username === username);
  if (!user) throw new Error('Invalid username or password.');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid username or password.');
  return { username };
}

module.exports = { users, register, login };
