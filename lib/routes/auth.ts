/**
 * Required External Modules
 */

 import { Router } from 'express';
 import passport from 'passport';
 import util from 'util';
 import url from 'url';
 import querystring from 'querystring';

 require('dotenv').config();

 module.exports = Router().get('/login', passport.authenticate('auth0', {
   scope: 'openid email profile'
 }),
 (req, res) => {
   res.redirect('/');
 }
 );