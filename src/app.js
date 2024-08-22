import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded());

//test
app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

export { app }