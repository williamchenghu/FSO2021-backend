const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./utils/config');
const personsRouter = require('./controllers/persons');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

console.log(`connecting to`, config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.log(`connected to MongoDB`))
  .catch((err) => logger.error(`error connecting to MongoDB:`, err.message));

morgan.token('reqJSON', (req) => JSON.stringify(req.body));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqJSON'
  )
);
app.use('/api/persons', personsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
