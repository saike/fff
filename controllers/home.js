export const index = async (req, res, next) => {

  res.json({
    title: 'Welcome to Friends For Friends',
    message: 'It is testing version'
  });

};