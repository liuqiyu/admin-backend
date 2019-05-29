'use strict';

import express from 'express';
const router = express.Router();
import Users  from './../controller/users/index';

router.post('/login', Users.login);

export default router;
