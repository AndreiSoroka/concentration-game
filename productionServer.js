const express  = require('express');
const path  = require('path');
// import { Nuxt, Builder } from 'nuxt'


const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.set('port', port);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('*', express.static(path.join(__dirname, 'public')));

// Import and Set Nuxt.js options
// let config = require('../nuxt.config.js')

// Init Nuxt.js
// const nuxt = new Nuxt(config)


// Give nuxt middleware to express
// app.use(nuxt.render)

// Listen the server
app.listen(port, host);

console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
