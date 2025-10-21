import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');

    // Get counts
    const [users, skills, deals, events, posts, messages] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM users'),
      pool.query('SELECT COUNT(*) FROM skills'),
      pool.query('SELECT COUNT(*) FROM group_deals'),
      pool.query('SELECT COUNT(*) FROM events'),
      pool.query('SELECT COUNT(*) FROM posts'),
      pool.query('SELECT COUNT(*) FROM messages')
    ]);

    // Get active users today
    const activeToday = await pool.query(`
      SELECT COUNT(DISTINCT user_id) 
      FROM (
        SELECT user_id FROM posts WHERE created_at > NOW() - INTERVAL '1 day'
        UNION
        SELECT sender_id as user_id FROM messages WHERE created_at > NOW() - INTERVAL '1 day'
        UNION
        SELECT user_id FROM skills WHERE created_at > NOW() - INTERVAL '1 day'
      ) as active_users
    `);

    res.json({
      totalUsers: parseInt(users.rows[0].count),
      totalSkills: parseInt(skills.rows[0].count),
      totalDeals: parseInt(deals.rows[0].count),
      totalEvents: parseInt(events.rows[0].count),
      totalPosts: parseInt(posts.rows[0].count),
      totalMessages: parseInt(messages.rows[0].count),
      activeToday: parseInt(activeToday.rows[0].count)
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
});

export default router;
