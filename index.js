const express = require('express');
const ruterApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = [
  'http://localhost:8080',
  'https://irwinet.com',
]
const options = {
  origin: (origin, callback)=> {
    if(whitelist.includes(origin) || !origin){
      callback(null, true)
    }
    else{
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

ruterApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Corriendo en el puerto: ' + port);
});
