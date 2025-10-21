import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Get all events
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const result = await pool.query(`
      SELECT e.*, u.first_name, u.last_name,
             COUNT(DISTINCT ea.user_id) as current_attendees
      FROM events e
      JOIN users u ON e.creator_id = u.id
      LEFT JOIN event_attendees ea ON e.id = ea.event_id
      WHERE e.event_date > NOW()
      GROUP BY e.id, u.first_name, u.last_name
      ORDER BY e.event_date ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Get my events
router.get('/my-events', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const result = await pool.query(
      'SELECT * FROM events WHERE creator_id = $1 ORDER BY event_date DESC',
      [decoded.userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching my events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Create event
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { title, description, location, event_date, category, max_attendees } = req.body;
    
    const result = await pool.query(
      `INSERT INTO events (creator_id, title, description, location, event_date, category, max_attendees)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [decoded.userId, title, description, location, event_date, category, max_attendees]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// RSVP to event
router.post('/:id/rsvp', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const eventId = req.params.id;
    
    await pool.query(
      'INSERT INTO event_attendees (event_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [eventId, decoded.userId]
    );
    
    res.json({ message: 'RSVP successful' });
  } catch (error) {
    console.error('Error RSVP to event:', error);
    res.status(500).json({ message: 'Failed to RSVP' });
  }
});

export default router;
