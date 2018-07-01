const Auth0Strategy = require("passport-auth0");

const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = process.env;

const strat = new Auth0Strategy(
  {
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "/login",
    //should it be 'scope: 'openid email profile'?
    scope: "openid email profile"
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

const logout = (req, red) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/login");
  });
};

module.exports = {
  strat,
  logout
};
