import passport from 'passport';
import PassportFacebook from 'passport-facebook';
import CONFIG from './index';
import User from '../models/user';

const FacebookStrategy = PassportFacebook.Strategy;

console.log(CONFIG);

passport.use(new FacebookStrategy({
    clientID: CONFIG.FACEBOOK.APP_ID,
    clientSecret: CONFIG.FACEBOOK.APP_SECRET,
    callbackURL: `${ CONFIG.PROTOCOL }://${ CONFIG.DOMAIN }:${ CONFIG.PORT }${CONFIG.FACEBOOK.CALLBACK_URL}`,
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
  },
  async function(token, refreshToken, profile, cb) {

    console.log('facebook profile: ');
    console.log(profile);
    console.log(profile.picture);

    let user;

    try {

      user = await User.findOne( {'facebook.id' : profile.id} );

      // user = await User.create(credentials);

    } catch ({message}) {

      return cb({
        status: 400,
        message
      });

    }

    if(user) return cb(null, user);

    let facebook_credentials = {
      id: profile.id,
      token: token,
      name: profile.displayName,
      email: profile.emails && profile.emails[0] && profile.emails[0].value,
      picture: profile.photos && profile.photos[0] && profile.photos[0].value
    };

    try {
      user = await User.create({ facebook: facebook_credentials });
    } catch (err) {
      return cb({
        status: 400,
        message: err.message
      });
    }

    return cb(null, user);

  }
));

passport.serializeUser(function(user, done) {
  // console.log('serialize:', user);
  done(null, user._id);
  // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  User.findById(id, function(err, user) {
    // console.log('deserialize:', user);
    done(err, user);
  });

});

export default passport;