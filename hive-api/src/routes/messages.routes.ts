import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Get conversations list
router.get('/conversations', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const result = await pool.query(`
      SELECT DISTINCT ON (other_user_id)
        other_user_id,
        u.first_name,
        u.last_name,
        u.profile_picture,
        m.content as last_message,
        m.created_at as last_message_time,
        m.read_at IS NULL AND m.receiver_id = $1 as has_unread
      FROM (
        SELECT 
          CASE 
            WHEN sender_id = $1 THEN receiver_id 
            ELSE sender_id 
          END as other_user_id,
          content,
          created_at,
          read_at,
          receiver_id
        FROM messages
        WHERE sender_id = $1 OR receiver_id = $1
      ) m
      JOIN users u ON u.id = m.other_user_id
      ORDER BY other_user_id, created_at DESC
    `, [decoded.userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Failed to fetch conversations' });
  }
});

// Get messages with a specific user
router.get('/with/:userId', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const otherUserId = req.params.userId;
    
    const result = await pool.query(`
      SELECT m.*, 
             sender.first_name as sender_first_name,
             sender.last_name as sender_last_name,
             receiver.first_name as receiver_first_name,
             receiver.last_name as receiver_last_name
      FROM messages m
      JOIN users sender ON m.sender_id = sender.id
      JOIN users receiver ON m.receiver_id = receiver.id
      WHERE (m.sender_id = $1 AND m.receiver_id = $2)
         OR (m.sender_id = $2 AND m.receiver_id = $1)
      ORDER BY m.created_at ASC
    `, [decoded.userId, otherUserId]);
    
    // Mark messages as read
    await pool.query(`
      UPDATE messages 
      SET read_at = NOW() 
      WHERE receiver_id = $1 AND sender_id = $2 AND read_at IS NULL
    `, [decoded.userId, otherUserId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// Send message
router.post('/send', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { receiver_id, content } = req.body;
    
    if (!receiver_id || !content) {
      return res.status(400).json({ message: 'Receiver and content required' });
    }
    
    const result = await pool.query(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
      [decoded.userId, receiver_id, content]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Get unread count
router.get('/unread-count', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = $1 AND read_at IS NULL',
      [decoded.userId]
    );
    
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ message: 'Failed to fetch unread count' });
  }
});

export default router;
