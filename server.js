const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRoute = require('./routes/user');
const placesRoute = require('./routes/places');

//cors options
const corsOptions = {
  origin: 'http://localhost/'
};

//connect to db
mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('CONNECTED TO DB'))
  .catch(err => console.log(err));

mongoose.connection.on('error', err => console.log(err));

//middleware
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use('/api/users', userRoute);
app.use('/api/places', placesRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
