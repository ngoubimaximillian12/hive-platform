import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db/init';

const router = express.Router();

// Register
router.post('/register', async (req: express.Request, res: express.Response) => {
  try {
    console.log('📝 Registration attempt:', req.body);
    
    const { email, password, first_name, last_name } = req.body;
    
    if (!email || !password || !first_name || !last_name) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('🔍 Checking if user exists...');
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    console.log('🔐 Hashing password...');
    const password_hash = await bcrypt.hash(password, 10);
    
    console.log('✏️ Creating user in database...');
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, first_name, last_name`,
      [email, password_hash, first_name, last_name]
    );
    
    const user = result.rows[0];
    console.log('✅ User created:', user);
    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'hive-secret-key-2025',
      { expiresIn: '7d' }
    );
    
    console.log('✅ Registration successful for:', email);
    
    res.status(201).json({ 
      token, 
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error: any) {
    console.error('❌ Registration error:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    console.log('🔐 Login attempt:', req.body.email);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log('✅ Login successful:', email);
    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'hive-secret-key-2025',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error: any) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Login failed: ' + error.message });
  }
});

// Get current user
router.get('/me', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, bio, profile_picture, rating, phone, address, created_at FROM users WHERE id = $1',
      [decoded.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Auth check error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update profile
router.put('/profile', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    
    const { first_name, last_name, bio, phone, address } = req.body;
    
    await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, bio = $3, phone = $4, address = $5 WHERE id = $6',
      [first_name, last_name, bio, phone, address, decoded.userId]
    );
    
    console.log('✅ Profile updated for user:', decoded.userId);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('❌ Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Change password
router.post('/change-password', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { current_password, new_password } = req.body;
    
    const result = await pool.query('SELECT password_hash FROM users WHERE id = $1', [decoded.userId]);
    const user = result.rows[0];
    
    const isValid = await bcrypt.compare(current_password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    const new_hash = await bcrypt.hash(new_password, 10);
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [new_hash, decoded.userId]);
    
    console.log('✅ Password changed for user:', decoded.userId);
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('❌ Change password error:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }
});

export default router;
