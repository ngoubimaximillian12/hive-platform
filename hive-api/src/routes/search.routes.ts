import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Universal search
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { q, category, type } = req.query;
    
    let results: any = {
      users: [],
      skills: [],
      deals: [],
      events: []
    };

    if (!q || q === '') {
      return res.json(results);
    }

    const searchTerm = `%${q}%`;

    // Search users
    if (!type || type === 'all' || type === 'users') {
      const users = await pool.query(`
        SELECT id, first_name, last_name, bio, rating
        FROM users
        WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR bio ILIKE $1)
        AND id != $2
        LIMIT 10
      `, [searchTerm, decoded.userId]);
      results.users = users.rows;
    }

    // Search skills
    if (!type || type === 'all' || type === 'skills') {
      const skills = await pool.query(`
        SELECT s.*, u.first_name, u.last_name
        FROM skills s
        JOIN users u ON s.user_id = u.id
        WHERE (s.title ILIKE $1 OR s.description ILIKE $1)
        ${category ? 'AND s.category = $2' : ''}
        LIMIT 10
      `, category ? [searchTerm, category] : [searchTerm]);
      results.skills = skills.rows;
    }

    // Search deals
    if (!type || type === 'all' || type === 'deals') {
      const deals = await pool.query(`
        SELECT gd.*, u.first_name, u.last_name
        FROM group_deals gd
        JOIN users u ON gd.creator_id = u.id
        WHERE (gd.title ILIKE $1 OR gd.description ILIKE $1)
        ${category ? 'AND gd.category = $2' : ''}
        AND gd.deadline > NOW()
        LIMIT 10
      `, category ? [searchTerm, category] : [searchTerm]);
      results.deals = deals.rows;
    }

    // Search events
    if (!type || type === 'all' || type === 'events') {
      const events = await pool.query(`
        SELECT e.*, u.first_name, u.last_name
        FROM events e
        JOIN users u ON e.creator_id = u.id
        WHERE (e.title ILIKE $1 OR e.description ILIKE $1)
        ${category ? 'AND e.category = $2' : ''}
        AND e.event_date > NOW()
        LIMIT 10
      `, category ? [searchTerm, category] : [searchTerm]);
      results.events = events.rows;
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
});

export default router;
