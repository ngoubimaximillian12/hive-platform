import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { initializeDatabase } from './db/init';
import { seedDatabase } from './db/seed';

import authRoutes from './routes/auth.routes';
import skillsRoutes from './routes/skills.routes';
import dealsRoutes from './routes/deals.routes';
import eventsRoutes from './routes/events.routes';
import postsRoutes from './routes/posts.routes';
import messagesRoutes from './routes/messages.routes';
import searchRoutes from './routes/search.routes';
import usersRoutes from './routes/users.routes';
import analyticsRoutes from './routes/analytics.routes';
import uploadRoutes from './routes/upload.routes';
import reviewsRoutes from './routes/reviews.routes';
import paymentsRoutes from './routes/payments.routes';
import notificationsRoutes from './routes/notifications.routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

async function startServer() {
  try {
    console.log('🔧 Initializing database...');
    await initializeDatabase();
    
    console.log('🌱 Seeding database...');
    await seedDatabase();
    
    console.log('✅ Database ready!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}

startServer();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hive API is running' });
});

// Mount all routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/notifications', notificationsRoutes);

app.listen(PORT, () => {
  console.log(`🐝 Hive API running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: http://localhost:4000`);
  console.log(`📁 Serving uploads from: ${path.join(__dirname, '../uploads')}`);
  console.log(`✅ All routes mounted successfully`);
});

export default app;
