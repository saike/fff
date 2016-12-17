const domain = 'fff.loc';

const port = 3000;

const protocol = 'http';

let config = {

  port: port,
  domain: domain,
  secret: 'kishkoglot',
  oauth: {
    facebook : {
      app_id : '174434533029014', // your App ID
      app_secret  : '24ac3e4a6261af682c61aab58bfe2c57', // your App Secret
      callback_url   : `${ protocol }://${ domain }:${ port }/auth/facebook/callback`
    }
  }

};

export default config;