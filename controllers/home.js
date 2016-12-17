import User from '../models/user';

export const index = async (req, res, next) => {

  console.log('Current user: ', req.user);

  let all_users;

  try {

    all_users = await User.find({})

  } catch (err) {

    throw err;

  }

  let context = {
    user: req.user,
    all_users: all_users || []
  };

  res.render('home', { locals: context } );

};