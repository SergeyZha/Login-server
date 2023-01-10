import express from 'express';
import mongoose from 'mongoose';
// to read the cookie from the request
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';

const app = express();
dotenv.config();

// / * db connection */;
mongoose.set('strictQuery', false);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1afoy9x.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => console.log(' DB connection successfully connected 🙂'))
  .catch((error) => console.log(error));

/*express and cors middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// once we deploy we will add the corsOption
const corsOption = {
  origin: ['http://localhost:3000', 'https://login-client2.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOption));
app.use(cookieParser());
// /uploads/images/name_of_the_image
app.use('/uploads', express.static('uploads'));

///routers

app.use('/api/auth', userRouter);

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ msg: error.message || 'there is an error' });
});

app.listen(5000, () => console.log('the server is up and running on 5000'));
