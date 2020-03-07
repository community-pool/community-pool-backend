const express = require('express');
const app = express();
const path = require('path');

const expressSession = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const authRouter = require('./routes/auth');
/**
 * Session Configuration
 */

export interface Session {
  secret: string;
  cookie: {
    secure: Boolean | undefined;
  };
  resave: boolean;
  saveUninitialized: boolean;
}

const session: Session = {
  secret: 'OrnithorhynchusAnatinus',
  cookie: { secure: undefined },
  resave: false,
  saveUninitialized: false
};

if (app.get('env') === 'production') session.cookie.secure = true;

/**
 * Passport Configuration
 */

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:7890/callback'
  },
  function(
    _accessToken: any,
    _refreshToken: any,
    _extraParams: any,
    profile: any,
    done: (arg0: null, arg1: any) => any
  ) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
);

/**
 * App Configuration
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession(path.join(__dirname, 'public')));

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
});

//************** */

app.use(express.json());

app.use('/', authRouter);

app.use('/api/v1/hello-world', require('./routes/hello-world'));
// import * as cors from 'cors';
const cors = require('cors');
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

app.use('/api/v1/posts', require('./routes/posts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

export { app };
