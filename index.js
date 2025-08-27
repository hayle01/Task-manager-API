import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import swaggerUi  from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';
import { limiter } from './middlewares/rateLimiter.js';

import { logger } from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import adminRoute from './routes/admin.js';
import uploadRoute from './routes/upload.js';
import tasksRoute from './routes/tasks.js'

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(helmet())
app.use(express.json());
app.use(cors())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(limiter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



// Custom  middlewares
// app.use(logger);


// Middleware to handle routes
app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/upload', uploadRoute);
app.use('/tasks', tasksRoute)

// Last route to handle 404 - Not Found
app.use(notFound);


// global error handler
app.use(errorHandler);


// Connect to MongoDB
mongoose.connect(process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

    
app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});