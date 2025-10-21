import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Get nearby users
router.get('/nearby', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const result = await pool.query(`
      SELECT id, first_name, last_name, bio, rating, profile_picture
      FROM users
      WHERE id != $1
      ORDER BY created_at DESC
      LIMIT 20
    `, [decoded.userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching nearby users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, bio, rating, profile_picture, created_at FROM users WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

export default router;
