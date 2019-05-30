'use strict';

import express from 'express';
const router = express.Router();

import login from './../controller/users/login'
import logout from './../controller/users/logout'

router.post('/login', login);
router.post('/logout', logout);

export default router;
