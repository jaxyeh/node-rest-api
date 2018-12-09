# Node.js Authentication API Server boilerplate
A boilerplate of RESTful API server that provides the ability to Register, Login, and lookup user profile. It enables uses of JWT-based for authentication and verification.
<p align="center">
  <img src="node-rest-api_cli.png" alt="cli" width="500"/>
</p>

## Features
- [koa2](http://koajs.com) - An expressive async and middleware web framework for Node.js
- [knex.js](http://knexjs.org) - A "batteries included" SQL query builder and migration
- [Objection.js]() - An SQL-friendly ORM for Node.js, built on an knex query builder
- [ObjectModel](http://objectmodel.js.org/) - A delightful JS testing framework
- [Joi](https://github.com/hapijs/joi) - A validator library for JavaScript objects
- [Bull](https://github.com/OptimalBits/bull) - A background job queue for Node.js
- [Jest](https://facebook.github.io/jest/) - don't let tests get in your way
- [supertest](https://github.com/visionmedia/supertest) - HTTP integration assertions tests
- [eslint](https://eslint.org/) - The pluggable linting utility for JavaScript
- [standardjs](https://standardjs.com/) - just don't worry about formatting rules
- [JWT-based Authentication](https://jwt.io/) - JSON Web Tokens authentication
- [NodeMailer](https://nodemailer.com/about/) - A email client library for Node.js
- [UPASH](https://github.com/simonepri/upash) Unified API for PASsword Hashing algorithms
- [Docker](https://www.docker.com/) - This app supports bundling into Docker containerization

<p align="center">
  <sub>
    Coded with ❤️ by <a href="#authors">Jason Yeh</a>.
  </sub>
</p>

## Prerequiesis

* Node.JS 10+ LTS
* PostgreSQL 9 or higher (or available via Docker container)
* Yarn
* Docker (optional)

Make sure you have postgreSQL Database configured

## Getting Started
Firstly, you need to install this package.
```bash
yarn
```
Add some configuration setup via `.env` file:
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_USER=postmaster@XXXXXXXXXXX.mailgun.org
SMTP_PASS=XXXXXXXXXXX
PGHOST=localhost
PGPORT=5432,
PGUSER=postgres
PGPASSWORD=XXXXXX
PGDATABASE=api-dev
```
Make sure you don't forget create database (default to `api-dev`) into PostgreSQL DB.
```bash
yarn start
```
Or, you can run the script to create database and migrate automatically.
```bash
yarn run server:init
```

The API is available at [http://localhost:3000](http://localhost:3000).

## Running with Docker
Write up SMTP configuration setup to the `.env` file on root of the directory:
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_USER=postmaster@XXXXXXXXXXX.mailgun.org
SMTP_PASS=XXXXXXXXXXX
```
Start up the Docker composer
```
  docker-compose up (compose and run, it also creates the redis and postgres database)

  docker-compose down (Destroy application and postgres containers)
```
Open up browser

* [http://localhost:8080](http://localhost:8080) - A client-side Web Application
* [http://localhost:3000](http://localhost:3000) - A server-side API Server


## Database Administration
This application also includes migrations tools to allow for you to define sets of schema changes so upgrading a database is a breeze. Here are the collection of user commands you can use to build, update, or rollback the database migration scripts:

* `yarn run server:init` - Automatically create new databases, run migration, and then start app.
* `yarn run db:setup` - Automatically create new databases
* `yarn run db:make` - This commands allows you to create a new migration scripts (i.e. `yarn run db:name {name}`)
* `yarn run db:latest` - Upgrade all the schema migrations scripts to the latest version
* `yarn run db:rollback` - Rollback to the previous successful migration script
* `yarn run db:seed:make` - Create a seeding file (i.e. `yarn run db:seed:make {name}`)
* `yarn run db:seed:run` - Run seeing files to load data into databases
* `yarn run db:reset` - Rollback and then repeat the migrate script again

## Other Commands

* `yarn run worker` - This is the command to run service worker separately from main app
* `yarn run lint` - Runs a code linting report over your existed code
* `yarn run lint-fix` - Runs lint and automatically fix them
* `yarn run test` - Runs unit and integration tests
* `yarn run test:watch` - Runs a fast interactive `watcher mode` that runs only test files related to changed files.
* `yarn run test:coverage` - Run this command gets you a full code coverage report, open the HTML report file (`./coverage/lcov-report/index.html`) for the extensive "visual" code coverage report.

## API Documentation
Here are the high-level API documentation:

* `/boom` - **KABOOOMMMM!**
* `/ping` - Receives health status and the datetime
* `/api/v1/user` [GET] [AUTH] - Retrieve user profile
* `/api/v1/user/confirm/{:token}` [GET] - Email Confirmation from email notification
* `/api/v1/user/register` [POST] - User Registeration
* `/api/v1/user/authenticate` [POST] - User Login

## Design Notes

### Why not using TypeScript? or ES6 Module?

As of today, ES6 module is not yet supported in Node.JS and is still in the experimental stage. ES6 Module and TypeScript will require us to transpile the code, therefore is not a native server-side language since it transpiles into standardized JavaScript code with polyfills. In order to troubleshooting, you will need source map to understand the transpiled code which becomes more difficult to operate via the server-side.

### Why did we split client and server-side application?

Well, the idea was to keep the client, and server-side agnostic from each other yet communicates via Web Server API. It gives us an easier time to maintain a subset of application and scale our team as we continue to grow. I have considered using `Mono repo` architecture to bundle two of our modules together into the same repository, and this allows us to maintain two sides of applications within the same subset of a testing platform and source repository. It should take me a day to implement them together. Unfortunately, I didn't have much time left for this idea.

### What's the future considerations for Scalable API?

Node.JS is perfect for IO-heavy application, Data-intensive real-time Apps, API-Driven (Micro) Services, and Streams (processing data on the fly). However, Node.JS is not so great for Serving Static Files, CPU-bound application, or creating a Monolithic application. Depending on many factors, we could consider using Load Balancing Server (HaProxy, gobetween, Traefik), Separate SSL Termination Server (Stud, NGiNX), Serve GZIP Compression separately (use NGiNX front), and Serving Static Assets separately (NGiNX, Varnish, or CDN). Node.JS serves really well as highly concurrent networking application, but significant of time the issues tend to be IO-bound and encouraged to offload into other worker or (micro)services.

### What we could do to improve the code?

- The internal-side of `config` loader design can be improved, and we could try load `dotenv` module once instead of per each subset config files.
- Add a universal `Logger` tools for debugging and integration with centralized log collection service.
- API Documentation, possibly using auto-generator tools. Consider improving code documentation using JSDoc tools.
- Improve more integrated environment configuration in between `.env` environment file and `docker-composer.yml` file.
- The code coverage is shallow, we should continue to add more unit and integration tests to improve code assurance. Consider integration with  [Coveralls]](https://coveralls.io/) or [Codecov](https://codecov.io/) for visual code coverages and Continuous Integration (CI) service.
- If we increase services and data modules, we can move up `src/routes.js` into a separate `routes` folder with a collection of multiple routing files. So goes the same for the service `workers/` folder.

# License

  MIT
