import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/dbConfig';
import bookRoutes from './routes/booksRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000; // Menggunakan port dari variabel lingkungan atau default ke 3000

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true }));

// Connect to MongoDB
connectDB();

// Swagger Options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Management API',
      version: '1.0.0',
      description: 'API for managing books',
    },
  },
  apis: ['./src/routes/*.ts'], // Menyertakan rute untuk Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', bookRoutes);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; // Mengekspor aplikasi untuk keperluan testing atau integrasi lainnya
