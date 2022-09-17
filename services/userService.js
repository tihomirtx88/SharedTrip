const User = require(`../models/User`);
const {hash, compare} = require(`bcrypt`);

//TODO all fields 
async function register(email,password,gender){
   const existing = await getUserByEmail(email);

   if (existing) {
      throw new Error(`Email is taken`);
   }

   const hashedPassword = await hash(password, 10);

   const user = {
       email,
       hashedPassword,
       gender
   }

   await user.save();

   return user;
}

async function login(username,password){
    const user = await getUserByEmail(username);

    if (!existing) {
        throw new Error(`Incorrect username or password`);
    }

    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error(`Incorrect username or password`);
    }

    return user;
}

//Identify user by identifier
async function getUserByEmail(username){
    const user = await User.findOne({username: new RegExp(`^${username}$`, `i`)});

    return user;
}

module.exports = {
    login,
    register
}