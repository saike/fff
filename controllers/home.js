export const index = async (req, res, next) => {

  console.log('Current user: ', req.user);

  let context = {
    user: req.user
  };

  res.render('home', { locals: context } );

};