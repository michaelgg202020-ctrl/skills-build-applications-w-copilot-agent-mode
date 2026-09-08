import express from 'express';
import routes from './routes.js';
import { apiBaseUrl } from './config/api.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (response.req.method === 'OPTIONS') return response.sendStatus(204);
  next();
});

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit API',
    status: 'ok',
    endpoints: ['/api/users', '/api/activities'],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'available' });
});

app.use('/api', routes);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: 'Request could not be completed' });
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
    process.exitCode = 1;
  }
}

startServer();