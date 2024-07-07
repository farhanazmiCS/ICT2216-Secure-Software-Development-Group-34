require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();
// rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const csrf = require('csurf');
const session = require('express-session')

// database
const connectDB = require('./db/connect');



//  routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const petRouter = require('./routes/petRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);



app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// CSRF protection
app.use(csrf({ cookie: true }));

// Middleware to set CSRF token in a cookie
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

app.use(session({ 
  secret:'secret',
  resave:false,
  saveUninitialized:false,
  cookie: {
    secure:false,
    maxAge: 1000*60*60
  }
}))

app.use(fileUpload());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
