import compression from 'compression';
import session from "cookie-session";
import csrf from "csurf";
import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import sslRedirect from 'heroku-ssl-redirect';
import { SignInController } from '../app/users/SignInController';
import { api } from './api';
import { getRequestMiddleware } from './getRequestMiddleware';
import './send-email';

config(); //loads the configuration from the .env file

async function startup() {
    const app = express();
    app.use(sslRedirect());
    app.use(session({
        secret: process.env["NODE_ENV"] === "production" ? process.env['SESSION_SECRET'] : process.env['SESSION_SECRET_DEV']
    }));
    app.use(compression());
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use('/api', (req, res, next) => {
        //disable csrf for the `currentUser` backend method that is the first call of the web site.
        const currentUserMethodName: keyof typeof SignInController = 'currentUser';
        if (req.path === '/' + currentUserMethodName)
            csrf({ ignoreMethods: ["post"] })(req, res, next);
        else
            csrf({})(req, res, next);
    });
    app.use("/api", (req, res, next) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        next();
    });
    app.use(getRequestMiddleware);
    app.use(api);

    app.use(express.static('dist/fitco-app'));
    app.use('/*', async (req, res) => {
        req.session
        if (req.headers.accept?.includes("json")) {
            console.log(req);
            res.status(404).json("missing route: " + req.originalUrl);
            return;
        }
        try {
            res.sendFile(process.cwd() + '/dist/fitco-app/index.html');
        } catch (err) {
            res.sendStatus(500);
        }
    });
    let port = process.env['PORT'] || 3002;
    app.listen(port);
}

startup();
