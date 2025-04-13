const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const {createTask, getTasks} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getTasks);

module.exports= router;