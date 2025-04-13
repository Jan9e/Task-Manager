const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const {createTask} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', authenticateToken, createTask);

module.exports= router;