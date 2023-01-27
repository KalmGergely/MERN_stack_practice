'use strict';

//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middleware/errorMiddleware')

//app
const app = express();

//db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to database.'))
    .catch(err => console.log(err));

//middleware
app.use(cors({ origin: true, credentials: true, }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//error handling
app.use(errorHandler);

//port
const port = process.env.PORT || 8080;

//listener
app.listen(port, () => console.log(`Server is running on port: ${port}`));