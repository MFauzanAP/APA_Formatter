'use strict';

/* ===================================================== Imports ==================================================== */
const express = require('express');
const router = express.Router();
const home = require('./home');



/* ====================================================== Setup ===================================================== */
router.use('/', home);



/* ===================================================== Exports ==================================================== */
module.exports = router;
