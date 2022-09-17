import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import featurePolicy from 'feature-policy';
import helmet from 'helmet';
import httpAuthConnect from 'http-auth-connect';
import noCache from 'nocache';
import path from 'path';

import uuidv4 from 'uuid/v4';
import Keygrip from 'keygrip';
import cryptojs from  'crypto-js';
import fileUpload from 'express-fileupload';
import ejs from 'ejs';

import handleAsync from './middleware/handle-async';
import handleBasicAuth from './middleware/handle-basic-auth';
import handleError from './middleware/handle-error';
import jsonOnly from './middleware/json-only';
import logging from './middleware/logging';


// Create Express server
const app = express();
app.enable('trust proxy');

app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(noCache());
app.use(helmet.permittedCrossDomainPolicies());
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1yr
  })
);
app.use(
  helmet.referrerPolicy({
    policy: 'same-origin',
  }),
);


app.use(helmet.frameguard({action: 'SAMEORIGIN'}));

app.use(
  featurePolicy({
    features: {
      fullscreen: ["'self'"],
    },
  }),
);

app.use((req, res, next) => {
  res.removeHeader('x-webkit-csp-report-only');
  res.removeHeader('x-content-security-policy-report-only');
  next();
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(logging);

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', [jsonOnly]);
app.use('/api/', [express.json()]);
app.use(fileUpload());

// Endpoints for angular to fetch data
// *** Do NOT use PUT methods as Velocity blocks that ***
app.get('/api/healthcheck', async (_req, res, _next) => {
  const timestamp = new Date(Date.now());
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: timestamp.toISOString(),
  };

  try {
    res.status(200).send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(500).send();
  }
});

/* eslint-disable @typescript-eslint/no-var-requires */
app.get('/api/v1/menu', handleAsync(require('@app/controllers/api/menu').index));

//http://localhost:5001/api/v1/menu/search?term=Rot
app.get('/api/v1/menu/search', handleAsync(require('@app/controllers/api/menu').searchByTerm));

app.get('/api/v1/menu/:id/details', handleAsync(require('@app/controllers/api/menu').getMenuItemImages));

// Using POST to cover both create and update cases because it could be either from the frontend perspective.
app.post('/api/v1/menu', handleAsync(require('@app/controllers/api/menu').saveMenu));
app.post('/api/v1/menu/:id/image', handleAsync(require('@app/controllers/api/menu').saveMenuImage));
app.post('/api/v1/menu/:id/vedio', handleAsync(require('@app/controllers/api/menu').saveMenuVedio));


/**
 * table: metadata
 */
 app.post('/api/v1/menu/:id/metadata', handleAsync(require('@app/controllers/api/menu').saveMenuMetadata));

 
// React will handle routes which does not contain /api/

/* Setup Middleware */
// These must go last
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(handleAsync(require('@app/controllers/not-found')));
app.use(handleError);

export default app;
