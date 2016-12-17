import express from 'express';

import * as AuthController from '../controllers/auth';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);

//facebook authorization
router.get('/facebook', AuthController.facebook_login);
router.get('/facebook/callback', AuthController.facebook_redirect, AuthController.facebook_callback);

router.get('/logout', AuthController.logout);

export default router;
