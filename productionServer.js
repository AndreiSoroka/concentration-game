const express  = require('express');
const path  = require('path');

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.set('port', port);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('*', express.static(path.join(__dirname, 'public')));

app.listen(port, host);

console.log('Server listening on ' + host + ':' + port);
