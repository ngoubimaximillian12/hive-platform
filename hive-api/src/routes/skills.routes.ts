import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Get all skills
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const result = await pool.query(`
      SELECT s.*, u.first_name, u.last_name, u.rating 
      FROM skills s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
});

// Get my skills
router.get('/my-skills', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const result = await pool.query(
      'SELECT * FROM skills WHERE user_id = $1 ORDER BY created_at DESC',
      [decoded.userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching my skills:', error);
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
});

// Create skill
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { title, description, category, level, is_offering } = req.body;
    
    const result = await pool.query(
      `INSERT INTO skills (user_id, title, description, category, level, is_offering)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [decoded.userId, title, description, category, level, is_offering]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ message: 'Failed to create skill' });
  }
});

export default router;
