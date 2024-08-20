import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import './passport.js';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';

const app = express();

app.use(session({
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded());

// Auth 
app.get('/auth', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}));

// Auth Callback
app.get('/auth/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/callback/failure'
    }), 
    (req, res) => {
        console.log(`Hello ${req.user.displayName}`);
        res.send(`Hello ${req.user.displayName}`)
    });


// failure
app.get('/auth/callback/failure', (req, res) => {
    res.send("Error");
})

//test
app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

export { app }