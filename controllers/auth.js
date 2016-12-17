import User from '../models/user';
import passport from '../config/facebook';

export const facebook_login = passport.authenticate('facebook', { scope: [ 'public_profile', 'email' ] });

export const facebook_redirect = passport.authenticate('facebook', { failureRedirect: '/' });

export const facebook_callback = (req, res) => {
  console.log('redirect facebook login');
  res.redirect('/');
};

export const logout = (req, res) => {
  req.logout();
  res.clearCookie('connect.sid');
  res.redirect('/');
};


export const signup = async (req, res, next) => {

  const credentials = req.body;

  let user;

  try {

    user = await User.create(credentials);

  } catch ({message}) {

    return next({
      status: 400,
      message
    });

  }

  res.json(user);

};

export const signin = async (req, res, next) => {

  const { login, password } = req.body;

  const user = await User.findOne({ login });

  if(!user) {
    return next({
      status: 400,
      message: 'User not found'
    });
  }

  try {
    const result = await user.compare_passwords(password);
  } catch (e) {
    return next({
      status: 400,
      message: 'Bad Credentials'
    });
  }

  req.session.userId = user._id;
  res.json(user);

};
