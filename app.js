const express = require('express');
const mustacheExpress = require('mustache-express');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const everyauth = require('@fusebit/everyauth-express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.engine('mustache', mustacheExpress());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(cookieSession({ name: 'session', secret: 'secret' }));

app.use(
    "/google/authorize/:userId",
    everyauth.authorize("google", {
        // EveryAuth will automatically redirect to this route after authenticate
        finishedUrl: "/google/calendarlist",
        // The user ID of the authenticated user the credentials will be associated with
        mapToUserId: (req) => req.params.userId,
    })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);




app.listen(8080, () => {
    console.log('Started Server')
})
