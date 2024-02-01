import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('EEEEE');
});
app.get('/weather-api', (req, res) => {
  console.log(typeof process.env.WEATHER_API_KEY);
  return res.json({ key: process.env.WEATHER_API_KEY });
});
app.get('/geocoding-api', (req, res) => {
  console.log(process.env.GEOCODING_API_KEY);
  return res.json({ key: process.env.GEOCODING_API_KEY });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
