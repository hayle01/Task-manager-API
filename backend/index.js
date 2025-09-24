import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { limiter } from './middlewares/rateLimiter.js';
import { swaggerSpec } from './utils/swagger.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

import authRoute from './routes/auth.js';
import tasksRoute from './routes/tasks.js';

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

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



// Custom  middlewares
// app.use(logger);


// Middleware to handle routes
app.use('/api/auth', authRoute);
app.use('/api/tasks', tasksRoute)



// Server frontend in production
if(process.env.NODE_ENV === 'production') {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // server the frontend
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
    })
    
}
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