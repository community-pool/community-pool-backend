/**
 * Required External Modules
 */

 import { Router } from 'express';
 import passport from 'passport';
 import util from 'util';
 import url from 'url';
 import querystring from 'querystring';

 require('dotenv').config();

 module.exports = Router()
 .get('/login', passport.authenticate('auth0', { scope: 'openid email profile' }), (req, res) => {
   res.redirect('/');
 })

 .get('/callback', (req, res, next) => {
   passport.authenticate('auth0', (err, user, info) => {
     if(err) {
       return next(err);
     }
     if(!user) {
       return res.redirect('/login');
     }
     req.logIn(user, (err) => {
       if(err) {
         return next(err);
       }
       const returnTo = req.session.returnTo;
       delete req.session.returnTo;
       res.redirect(returnTo || '/')
     });
   })(req, res, next);
 });