import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-08-27.basil',
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { package: packageName, viewingAddonEnabled, viewingAddonAmount } = req.body;
    
    // Validate input
    if (!packageName || !['classic', 'premier'].includes(packageName)) {
      return res.status(400).json({ error: 'Invalid package selection' });
    }
    
    // Map package to price in pence
    const packagePrices = {
      classic: 95000, // £950.00
      premier: 125000, // £1,250.00
    };
    
    const packagePrice = packagePrices[packageName as keyof typeof packagePrices];
    
    // Prepare line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `${packageName.charAt(0).toUpperCase() + packageName.slice(1)} Package`,
          },
          unit_amount: packagePrice,
        },
        quantity: 1,
      },
    ];
    
    // Add viewing add-on if enabled and amount is valid
    if (viewingAddonEnabled && viewingAddonAmount > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Viewing add-on',
          },
          unit_amount: Math.round(viewingAddonAmount * 100), // Convert pounds to pence
        },
        quantity: 1,
      });
    }
    
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/failed`,
      metadata: {
        package: packageName,
        viewingAddonEnabled: viewingAddonEnabled ? 'true' : 'false',
        viewingAddonAmount: viewingAddonEnabled ? viewingAddonAmount.toString() : '0',
      },
    });
    
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Get session details
app.get('/api/session/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['payment_intent', 'line_items'],
    });
    
    res.json(session);
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
});

// Webhook endpoint (stub)
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.log('Webhook secret not configured');
      return res.status(400).send('Webhook secret not configured');
    }
    
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      console.log('Checkout session completed:', event.data.object);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});