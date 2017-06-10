'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser.raw({ type: 'audio/aac', limit: '50mb' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
// app.use('/api/profiles', routes.profiles);
app.use('/api/locations', routes.locations);
app.use('/api/locationsusers', routes.locationsusers);
app.use('/api/locationsusersaudio', routes.locationsusersaudio);
app.use('/api/users', routes.users);
app.use('/api/connections', routes.connections);

module.exports = app;
