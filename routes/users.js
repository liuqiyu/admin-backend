'use strict';

import express from 'express';
const router = express.Router();
import Users  from './../controller/users/index';

router.get('/login', Users.login);

export default router;
