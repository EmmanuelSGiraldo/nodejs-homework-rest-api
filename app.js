const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect("mongodb+srv://esgg1:esgg1@cluster0.rzdqxdp.mongodb.net/db-contacts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(process.env.PORT || 8080);
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = app;


