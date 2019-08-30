const path = require('path');
const express = require('express');
const debug = require('debug')('app:server');
const config = require('config');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/*', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(config.port, () => {
	debug(`Listening on ${config.port}`);
});