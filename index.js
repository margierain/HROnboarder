let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let config = require('config');
let task = require('./server/routes/task');
let app = express();
const port = 5000;


mongoose.connect(config.dbHost);
mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the HR Onboader API' });
});

app.get('/task', task.getTasks);


app.listen(port, () => {
  console.log(`API running on port ${port}`)
})

module.exports = app;
