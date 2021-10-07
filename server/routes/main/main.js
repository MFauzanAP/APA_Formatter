'use strict';

/* ===================================================== Imports ==================================================== */
const express = require('express');
const router = express.Router();
const form = require('./form');
const checklist = require('./checklist');
const converter = require('./converter');
const dashboard = require('./dashboard');



/* ====================================================== Setup ===================================================== */
router.use('/', form);
router.use('/dashboard', dashboard);



/* ===================================================== Exports ==================================================== */
module.exports = router;
