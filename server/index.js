import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes/index';

const app = express();

const port = process.env.PORT || 8080;

app.use(logger('dev'));
// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


app.use('/api/v1', routes);

app.use(express.static('docs'));
app.use((req, res, next) => {
  res.render('index.html');
  next();
});


app.listen(port);

export default app;
