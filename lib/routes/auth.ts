/**
 * Required External Modules
 */

import { Router } from 'express';
import passport from 'passport';
import util from 'util';
import querystring from 'querystring';

require('dotenv').config();

module.exports = Router()
  .get(
    '/login',
    passport.authenticate('auth0', { scope: 'openid email profile' }),
    (req, res) => {
      res.redirect('/');
    }
  )

  .get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        let returnTo;
        if (req.session && req.session.returnTo) {
          returnTo = req.session.returnTo;
          delete req.session.returnTo;
        }
        res.redirect(returnTo || 'http://localhost:3000/');
      });
    })(req, res, next);
  })

  .get('/logout', (req, res) => {
    req.logOut();
    let returnTo = req.protocol + '://' + req.hostname;
    const port = req.connection.localPort;

    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo =
        process.env.NODE_ENV === 'production'
          ? `${returnTo}/`
          : `${returnTo}:${port}/`;
    }

    const logoutURL = new URL(
      util.format('https://%s/logout', process.env.AUTH0_DOMAIN)
    );
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL.toString());
    // docs have it as logoutURL but hat to add .toString() because .redirect requires a string
  });
