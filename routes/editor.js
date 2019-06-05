'use strict';

import express from 'express';
const router = express.Router();

import add from './../controller/editor/add'

router.get('/add', add);

export default router;
