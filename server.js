import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import body_parser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

//config
import config from './config';

//routes
import AuthRoute from './routes/auth';

//middleware
import ErrorHandler from './middlewares/error_handler';

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, (err) => {

  if(err) throw err;

  console.log('mongo connected');

});

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

app.use('/api', AuthRoute);

app.use(ErrorHandler);

