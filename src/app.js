import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import { verifyToken } from './middlewares/verifyToken.middleware.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded());

//test
app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use("/api/user", userRouter);
app.use(verifyToken());
app.use("/api/task", taskRouter);

export { app }