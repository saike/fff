import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import body_parser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import passport from './config/facebook';
import cookie_parser from 'cookie-parser';

//template engine
import Render from 'express-es6-template-engine';

//config
import config from './config';
import db_config from './config/mongodb';

//routes
import AuthRouter from './routes/auth';
import HomeRouter from './routes/home';

//middleware
import ErrorHandler from './middlewares/error_handler';

//create express server app
const app = express();

//connect to mongodb
mongoose.Promise = bluebird;
mongoose.connect([ db_config.host, db_config.db ].join('/'), (err) => {

  if(err) throw err;

  console.log('mongo connected');

});

//use es6 template render
app.engine('html', Render);
app.set('views', 'views');
app.set('view engine', 'html');

//node monitoring
app.use(morgan('combined'));

//request parsers
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(cookie_parser()); // read cookies (needed for auth)

//authorization middlewares
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', AuthRouter);
app.use('/', HomeRouter);

app.use(ErrorHandler);

//start app
app.listen(config.port, (err) => {
  if(err) throw err;
  console.log(`Server listening on port: ${config.port}`);
});

