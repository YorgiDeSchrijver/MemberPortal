import { createRequestHandler } from '@react-router/express';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remixHandler = createRequestHandler({
  build: await import('./server/index.js'),
});

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

app.use(
  '/assets',
  express.static(path.join(__dirname, './client/assets'), {
    immutable: true,
    maxAge: '1y',
  })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static(path.join(__dirname, './client'), { maxAge: '1h' }));

app.use(morgan('tiny'));

// handle SSR requests
app.all('*', remixHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);
