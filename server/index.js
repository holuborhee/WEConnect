import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();
const app = express();

const port = process.env.PORT || 8081;

app.use(logger('dev'));
// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


app.use('/api/v1', routes);

app.use('/docs', express.static('docs'));
app.use('/', (req, res) => {
  res.status(400).send({ status: 'error', meassage: "The server doesn't understand the path you requested for" });
});


app.listen(port);

export default app;
