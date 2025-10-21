import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Get all posts
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.first_name, u.last_name,
             COUNT(DISTINCT l.id) as likes_count,
             COUNT(DISTINCT c.id) as comments_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN comments c ON p.id = c.post_id
      GROUP BY p.id, u.first_name, u.last_name
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Get my posts
router.get('/my-posts', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const result = await pool.query(`
      SELECT p.*,
             COUNT(DISTINCT l.id) as likes_count,
             COUNT(DISTINCT c.id) as comments_count
      FROM posts p
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN comments c ON p.id = c.post_id
      WHERE p.user_id = $1
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `, [decoded.userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching my posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Create post
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { content, type } = req.body;
    
    const result = await pool.query(
      'INSERT INTO posts (user_id, content, type) VALUES ($1, $2, $3) RETURNING *',
      [decoded.userId, content, type || 'post']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Like post
router.post('/:id/like', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const postId = req.params.id;
    
    await pool.query(
      'INSERT INTO likes (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [decoded.userId, postId]
    );
    
    res.json({ message: 'Post liked' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post' });
  }
});

export default router;
