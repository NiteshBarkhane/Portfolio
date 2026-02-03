import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contentRoutes from './routes/contentRoutes.js';

dotenv.config()
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', contentRoutes);

app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:');
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
