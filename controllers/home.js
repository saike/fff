export const index = async (req, res, next) => {

  console.log(req.query);

  let context = {
    items: [ 'item1', 'item2', 'item3' ],
    name: req.query.name || 'No name'
  };

  res.render('home', { locals: context } );

};