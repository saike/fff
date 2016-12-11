import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import body_parser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

//template engine
import Render from 'express-es6-template-engine';

//config
import config from './config';

//routes
import AuthRouter from './routes/auth';
import HomeRouter from './routes/home';

//middleware
import ErrorHandler from './middlewares/error_handler';

//create express server app
const app = express();

//connect to mongodb
mongoose.Promise = bluebird;
mongoose.connect(config.database, (err) => {

  if(err) throw err;

  console.log('mongo connected');

});

//use es6 template render
app.engine('html', Render);
app.set('views', 'views');
app.set('view engine', 'html');

//start app
app.listen(config.port, (err) => {
  if(err) throw err;
  console.log(`Server listening on port: ${config.port}`);
});

app.use(morgan('combined'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}));

app.use('/api', AuthRouter);
app.use('/', HomeRouter);

app.use(ErrorHandler);

