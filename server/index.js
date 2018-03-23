import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './routes/index';

const app = express();

const port = process.env.PORT || 8080;

app.use(logger('dev'));
// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', routes);

app.use((req, res, next) => {
  res.redirect('/docs');
  next();
});


app.listen(port);

export default app;