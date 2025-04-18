const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes= require('./routes/authRoutes');
const taskRoutes= require('./routes/taskRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.use('/', authRoutes);
app.use('/', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
