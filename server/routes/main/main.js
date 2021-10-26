'use strict';

/* ===================================================== Imports ==================================================== */
const express = require('express');
const router = express.Router();
const form = require('./form');
const checklist = require('./checklist');
const report = require('./report');
const dashboard = require('./dashboard');



/* ====================================================== Setup ===================================================== */
router.use('/', form);
router.use('/dashboard', dashboard);
router.use('/report', report);



/* ===================================================== Exports ==================================================== */
module.exports = router;
