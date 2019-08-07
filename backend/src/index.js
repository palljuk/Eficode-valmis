const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || 'fcd4e6eda88229788ec847fbdeb51054';
const mapURI =
  process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&units=metric&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchWeather5Days = async () => {
  const endpoint = `${mapURI}/forecast?q=${targetCity}&units=metric&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData;
});

router.get('/api/weatherfivedays', async ctx => {
  const weatherData5Days = await fetchWeather5Days();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData5Days;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
