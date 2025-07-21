const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/books', generalRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
