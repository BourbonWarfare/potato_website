// import * as bcrypt from 'bcrypt';
var bcrypt = require('bcrypt');
const password = 'random-password';

const getPass = async () => {
  // take input, hash it
  // store it
  // take input, compare it to hash
  // do something
  const hash = await bcrypt.hash(password, 10);
  const salt = await bcrypt.genSalt();
  // store it here
  console.log(hash);
  // user enters their password again
  const isMatch = await bcrypt.compare(password, hash);
  console.log(isMatch);
};
getPass();
