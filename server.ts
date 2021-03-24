import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import * as https from 'https';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import * as fs from 'fs';
import * as cors from 'cors';
import * as routes from './src/server/routes';
var bodyParser = require('body-parser');

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = getDist();
  const indexHtml = fs.existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));
  server.use(cors())
        .use(bodyParser())
        .use(bodyParser.json({limit: '50mb'}))
        .use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  server.set('view engine', 'html');
  server.set('views', distFolder);

  routes.routes(server)
  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function getDist() {
  return join(process.cwd(), '/dist/ui/browser')
}

function run(): void {
  const port = process.env.PORT || 4000;
  const distFolder = getDist();
  const opts = {
    key: fs.readFileSync(`${distFolder}/assets/certs/chunkedwedge.com.key`),
    cert: fs.readFileSync(`${distFolder}/assets/certs/chunkedwedge.com.crt`)
  }
  // Start up the Node server
  const server = https.createServer(opts, app());
  server.listen(port, () => {
    console.log(`Node Express server listening on https://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';