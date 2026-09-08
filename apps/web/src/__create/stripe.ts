import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn(
    'STRIPE_SECRET_KEY is not set. Stripe operations will fail until you add it to your .env file.'
  );
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export default stripe;
export { stripe as Stripe };
