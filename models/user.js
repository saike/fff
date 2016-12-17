import mongoose, { Schema } from 'mongoose';

import bcrypt from 'bcrypt-as-promised';

const UserSchema = new Schema({
  // login: {
  //   type: String,
  //   unique: true,
  //   lowercase: true,
  //   index: true
  // },
  // password: String,
  facebook: {
    id: {
      type: String,
      unique: true
    },
    token: String,
    email: {
      type: String,
      unique: true
    },
    picture: String,
    name: String
  }
});

// UserSchema.pre('save', async function (next) {
//
//   if(!this.isModified('password')){
//     return next();
//   }
//
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(this.password, salt);
//
//   this.password = hash;
//
//   next();
//
// });

// UserSchema.methods.compare_passwords = function (password) {
//   return bcrypt.compare(password, this.password);
// };

export default mongoose.model('User', UserSchema);