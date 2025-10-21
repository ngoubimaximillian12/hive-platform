import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Get all deals
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const result = await pool.query(`
      SELECT gd.*, u.first_name, u.last_name,
             COUNT(DISTINCT dp.user_id) as current_people
      FROM group_deals gd
      JOIN users u ON gd.creator_id = u.id
      LEFT JOIN deal_participants dp ON gd.id = dp.deal_id
      WHERE gd.deadline > NOW()
      GROUP BY gd.id, u.first_name, u.last_name
      ORDER BY gd.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ message: 'Failed to fetch deals' });
  }
});

// Get my deals
router.get('/my-deals', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const result = await pool.query(
      'SELECT * FROM group_deals WHERE creator_id = $1 ORDER BY created_at DESC',
      [decoded.userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching my deals:', error);
    res.status(500).json({ message: 'Failed to fetch deals' });
  }
});

// Create deal
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { title, description, product, original_price, group_price, minimum_people, deadline, category } = req.body;
    
    const result = await pool.query(
      `INSERT INTO group_deals (creator_id, title, description, product, original_price, group_price, minimum_people, deadline, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [decoded.userId, title, description, product, original_price, group_price, minimum_people, deadline, category]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating deal:', error);
    res.status(500).json({ message: 'Failed to create deal' });
  }
});

// Join deal
router.post('/:id/join', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const dealId = req.params.id;
    
    await pool.query(
      'INSERT INTO deal_participants (deal_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [dealId, decoded.userId]
    );
    
    res.json({ message: 'Successfully joined deal' });
  } catch (error) {
    console.error('Error joining deal:', error);
    res.status(500).json({ message: 'Failed to join deal' });
  }
});

export default router;
