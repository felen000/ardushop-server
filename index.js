import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'

import productRouter from './routers/productRouter.js';
import cartRouter from './routers/cartRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import wishListRouter from './routers/wishListRouter.js'
import errorMiddleware from './middlewares/errorMiddleware.js';

let PORT = process.env.PORT ?? 3000;
let DB_URL = process.env.DB_URL;

let app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors({
	methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
	credentials: true,
	origin: process.env.CLIENT_URL
}));
app.use(fileUpload())

app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);
app.use('/wishlist', wishListRouter);
app.use('/user', userRouter);

app.use(errorMiddleware)

async function startApp() {
  try {
    await mongoose.connect(DB_URL,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);

    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
