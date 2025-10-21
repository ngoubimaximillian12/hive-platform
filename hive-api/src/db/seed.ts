import { pool } from './init';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Check if demo user exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      ['demo@hive.app']
    );

    if (existingUser.rows.length === 0) {
      // Create demo user
      const passwordHash = await bcrypt.hash('demo123', 10);
      
      const userResult = await pool.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, bio, rating)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        ['demo@hive.app', passwordHash, 'Demo', 'User', 'Welcome to Hive! I love connecting with neighbors.', 4.9]
      );

      const userId = userResult.rows[0].id;
      console.log('✅ Demo user created');

      // Create sample skills
      await pool.query(
        `INSERT INTO skills (user_id, title, description, category, level, is_offering)
         VALUES 
         ($1, 'Guitar Lessons', 'Teaching guitar for 10+ years. All levels welcome!', 'Music', 'expert', true),
         ($1, 'Web Development', 'Can help with React, Node.js, and full-stack development', 'Technology', 'expert', true),
         ($1, 'Yoga Classes', 'Morning yoga sessions in the park', 'Sports', 'intermediate', true)`,
        [userId]
      );
      console.log('✅ Sample skills created');

      // Create sample deals
      await pool.query(
        `INSERT INTO group_deals (creator_id, title, description, product, original_price, group_price, minimum_people, deadline, category)
         VALUES 
         ($1, 'Organic Produce Box', 'Fresh organic vegetables delivered weekly', 'Organic Vegetable Box', 45.00, 27.00, 10, NOW() + INTERVAL '7 days', 'Food'),
         ($1, 'Bulk Paper Products', 'Toilet paper, paper towels, and tissues', 'Paper Products Bundle', 60.00, 36.00, 8, NOW() + INTERVAL '5 days', 'Household'),
         ($1, 'Local Honey', 'Raw honey from local beekeepers', '12oz Honey Jar', 15.00, 9.00, 15, NOW() + INTERVAL '10 days', 'Food')`,
        [userId]
      );
      console.log('✅ Sample deals created');

      // Create sample events
      await pool.query(
        `INSERT INTO events (creator_id, title, description, location, event_date, category, max_attendees)
         VALUES 
         ($1, 'Community Yoga', 'Free yoga session in the park. Bring your own mat!', 'Lincoln Park', NOW() + INTERVAL '3 days', 'Sports', 20),
         ($1, 'Block Party BBQ', 'Annual neighborhood BBQ. Bring a dish to share!', 'Main Street', NOW() + INTERVAL '7 days', 'Social', 50),
         ($1, 'Book Club Meeting', 'Discussing "The Midnight Library". All welcome!', 'Community Center', NOW() + INTERVAL '4 days', 'Education', 15)`,
        [userId]
      );
      console.log('✅ Sample events created');

      // Create sample posts
      await pool.query(
        `INSERT INTO posts (user_id, content, type)
         VALUES 
         ($1, 'Just moved to the neighborhood! Looking forward to meeting everyone! 👋', 'post'),
         ($1, 'Anyone know a good plumber? Need help with a leaky faucet.', 'question'),
         ($1, 'Reminder: Community cleanup this Saturday at 9 AM!', 'announcement')`,
        [userId]
      );
      console.log('✅ Sample posts created');

    } else {
      console.log('✅ Demo user already exists');
    }

    console.log('🎉 Database seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}
