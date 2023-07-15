import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { Entry } from 'contentful-management';
const contentfulManagement = require('contentful-management');
const contentful = require('contentful');
require('dotenv').config();
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const { ContentfulSitemap } = require('contentful-sitemap');

import { AppServerModule } from './src/main.server';
const jwt = require('jsonwebtoken');

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

const client = contentful.createClient({
    space: process.env['SPACE'],
    accessToken: process.env['TOKEN'],
});

const sitemapGenerator = new ContentfulSitemap(client, [
    {
        pattern: '/',
        id: 'inicio',
        priority: 1,
    },
    {
        pattern: '/terapia-alternativa',
        id: 'terapia-alternativa',
        priority: 0.7,
    },
    {
        pattern: '/ingenieria',
        id: 'ingenieria',
        priority: 0.7,
    },
    {
        pattern: '/redes-de-contactos',
        id: 'redes-de-contactos',
        priority: 0.7,
    },
    {
        pattern: '/recursos',
        id: 'recursos',
        priority: 0.7,
    },
    {
        pattern: '/recursos/:slug',
        priority: 0.5,
        query: {
            content_type: 'recursos',
            select: 'fields.slug',
        },
        params: {
            slug: 'fields.slug',
        },
    },
]);

global['window'] = mock.getWindow();
global['document'] = mock.getDocument();
global['navigator'] = mock.getNavigator();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();
    const distFolder = join(process.cwd(), 'dist/angular-egbm/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html'))
        ? 'index.original.html'
        : 'index';

    // sitemap
    let sitemap: any;

    server.use(express.json());

    server.get('/sitemap.xml', (req, res) => {
        res.header('Content-Type', 'application/xml');
        res.header('Content-Encoding', 'gzip');

        if (sitemap) {
            return res.send(sitemap);
        }

        try {
            const smStream = new SitemapStream({
                hostname: 'https://egbmdimensions.cl/',
            });
            const pipeline = smStream.pipe(createGzip());

            return sitemapGenerator
                .buildRoutes()
                .then((routes: any[]) => {
                    // pipe your entries or directly write them.
                    routes.forEach((route) => smStream.write(route));
                    smStream.end();

                    // cache the response
                    streamToPromise(pipeline).then((sm: any) => (sitemap = sm));
                    // stream write the response
                    pipeline.pipe(res).on('error', (e: any) => {
                        throw e;
                    });
                })
                .catch((error: any) => {
                    console.error(error);
                    res.status(500).end();
                });
        } catch (e) {
            console.error(e);
            res.status(500).end();
        }
    });

    // Endpoint to generate the JWT token
    server.post('/api/confirm', (req, res) => {
        try {
            // Get the form data from the request body
            const { nombre, fecha, hora, email, telefono, motivoDeConsulta, sintomas, nivelDeBienestar, tiempos, nacimiento } = req.body;
      
            // Generate the JWT with the form data and a 30-minute expiration
            const jwtSecret = process.env['JWTS'];
            const token = jwt.sign(
                {
                nombre,
                fecha,
                hora,
                email,
                telefono,
                motivoDeConsulta,
                sintomas,
                nivelDeBienestar,
                tiempos,
                nacimiento
                },
                jwtSecret,
                { expiresIn: '15m' }
            );
      
            res.status(200).json(token);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error' });
        }
    });

    // Endpoint to create the entry in the calendar
    server.post('/api/calendar', async (req, res) => {
        try {
            // Access the API token securely from your server-side environment
            const jwtToken = req.query['t']; // Assuming the token is sent as a query parameter

            if (!jwtToken) {
                res.status(400).json({ message: 'Token not provided' });
                return;
            }
    
            // Verify the JWT token
            const jwtSecret = process.env['JWTS'];
            jwt.verify(jwtToken, jwtSecret, (err: any, decoded: any) => {
                if (err) {
                    console.error(err);
                    res.status(401).json({ message: 'Invalid token' });
                } else {
                    // Extract data from the token
                    const { 
                        nombre,
                        fecha,
                        hora,
                        email,
                        telefono,
                        motivoDeConsulta,
                        sintomas,
                        nivelDeBienestar,
                        tiempos,
                        nacimiento
                    } = decoded;
    
                    // Create a Contentful client instance using the token
                    const managementClient = contentfulManagement.createClient({
                        accessToken: process.env['CONTENT_TOKEN']
                    });
    
                    const space = process.env['SPACE'];
    
                    managementClient.getSpace(space)
                        .then((space: any) => space.getEnvironment('master'))
                        .then((env: any) => {
                            return env.createEntry('calendar', {
                                fields: {
                                    nombre: {
                                        'en-US': nombre
                                    },
                                    nacimiento: {
                                        'en-US': nacimiento
                                    },
                                    fecha: {
                                        'en-US': new Date(fecha)
                                    },
                                    hora: {
                                        'en-US': hora
                                    },
                                    email: {
                                        'en-US': email
                                    },
                                    telefono: {
                                        'en-US': telefono
                                    },
                                    motivoDeConsulta: {
                                        'en-US': motivoDeConsulta
                                    },
                                    sintomas: {
                                        'en-US': sintomas
                                    },
                                    tiempos: {
                                        'en-US': tiempos
                                    },
                                    nivelDeBienestar: {
                                        'en-US': String(nivelDeBienestar)
                                    }
                                }
                            });
                        })
                        .then((entry: any) => entry.publish())
                        .then((publishedEntry: any) => {
                            console.log('Post creado exitosamente:', publishedEntry);
                        })
                        .catch((error: any) => {
                            console.error('Error al crear el post:', error.message);
                        });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error' });
        }
    });

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
    server.engine(
        'html',
        ngExpressEngine({
            bootstrap: AppServerModule,
        })
    );

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(distFolder, {
            maxAge: '1y',
        })
    );

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        res.render(indexHtml, {
            req,
            providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
        });
    });

    return server;
}

function run(): void {
    const port = process.env['PORT'] || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(
            `Node Express server listening on http://localhost:${port}`
        );
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
