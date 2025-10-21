import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Get reviews for a user
router.get('/user/:userId', async (req: express.Request, res: express.Response) => {
  try {
    const result = await pool.query(`
      SELECT r.*, 
             u.first_name as reviewer_first_name,
             u.last_name as reviewer_last_name,
             u.profile_picture as reviewer_picture
      FROM reviews r
      JOIN users u ON r.reviewer_id = u.id
      WHERE r.reviewed_user_id = $1
      ORDER BY r.created_at DESC
    `, [req.params.userId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// Create review
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { reviewed_user_id, rating, comment, transaction_type, transaction_id } = req.body;

    if (!reviewed_user_id || !rating) {
      return res.status(400).json({ message: 'User ID and rating required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    if (decoded.userId === reviewed_user_id) {
      return res.status(400).json({ message: 'Cannot review yourself' });
    }

    const result = await pool.query(`
      INSERT INTO reviews (reviewer_id, reviewed_user_id, rating, comment, transaction_type, transaction_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [decoded.userId, reviewed_user_id, rating, comment, transaction_type, transaction_id]);

    console.log('✅ Review created');
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'You have already reviewed this transaction' });
    }
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review' });
  }
});

// Get my reviews (reviews I wrote)
router.get('/my-reviews', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');

    const result = await pool.query(`
      SELECT r.*, 
             u.first_name as reviewed_first_name,
             u.last_name as reviewed_last_name
      FROM reviews r
      JOIN users u ON r.reviewed_user_id = u.id
      WHERE r.reviewer_id = $1
      ORDER BY r.created_at DESC
    `, [decoded.userId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching my reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

export default router;
