import express from 'express';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import { pool } from '../db/init';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_key', {
  apiVersion: '2023-10-16'
});

// Create payment intent for a deal
router.post('/create-intent', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');
    const { deal_id, amount } = req.body;

    // Get deal details
    const deal = await pool.query('SELECT * FROM group_deals WHERE id = $1', [deal_id]);
    
    if (deal.rows.length === 0) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        user_id: decoded.userId,
        deal_id: deal_id
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error: any) {
    console.error('Payment intent creation failed:', error);
    res.status(500).json({ message: error.message });
  }
});

// Webhook for payment confirmation
router.post('/webhook', express.raw({type: 'application/json'}), async (req: express.Request, res: express.Response) => {
  const sig = req.headers['stripe-signature'] as string;
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_your_secret'
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const { user_id, deal_id } = paymentIntent.metadata;

      // Record payment in database
      await pool.query(
        'INSERT INTO deal_participants (deal_id, user_id, payment_status) VALUES ($1, $2, $3)',
        [deal_id, user_id, 'paid']
      );

      console.log('✅ Payment successful for deal:', deal_id);
    }

    res.json({received: true});
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// Get payment history
router.get('/history', async (req: express.Request, res: express.Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'hive-secret-key-2025');

    const result = await pool.query(`
      SELECT dp.*, gd.title, gd.group_price, gd.created_at as deal_date
      FROM deal_participants dp
      JOIN group_deals gd ON dp.deal_id = gd.id
      WHERE dp.user_id = $1 AND dp.payment_status = 'paid'
      ORDER BY dp.created_at DESC
    `, [decoded.userId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Failed to fetch payment history' });
  }
});

export default router;
