import express, { Router } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import { fromLatLng, setKey } from 'react-geocode';
import { GeocodingAPIType } from '../src/types/GeocodingAPIType';

const app = express();
const router = Router();
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

app.use(bodyParser.json());

router.post('/weather', (req, res) => {
  const fetchData = async () => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${req.body.city}&days=6&aqi=yes&alerts=no`
    );
    const data = await response.json();
    res.json(data);
  };
  fetchData();
});

router.post('/geocoding', (req, res) => {
  const fetchData = async () => {
    setKey(process.env.GEOCODING_API_KEY as string);
    const data: string = await fromLatLng(
      req.body.latitude,
      req.body.longitude
    ).then(({ results }: { results: GeocodingAPIType[] }) => {
      const data = results.filter((result) => {
        if (result.types.includes('locality')) return result;
      });
      return data[0].formatted_address;
    });
    res.json(data);
  };
  fetchData();
});

app.use('/api/', router);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

export const handler = serverless(app);
