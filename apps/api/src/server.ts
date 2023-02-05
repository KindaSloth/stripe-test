import * as dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { Stripe } from 'stripe';

dotenv.config();

const server = express();
// eslint-disable-next-line turbo/no-undeclared-env-vars
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-11-15'
});

server.use(json());
server.use(cors());

server.post('/create-payment-intent', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true
        }
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

server.post('/sub', async (req, res) => {
    const { email, payment_method } = req.body;

    const customer = await stripe.customers.create({
        payment_method: payment_method,
        email: email,
        invoice_settings: {
            default_payment_method: payment_method
        }
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ quantity: 1, price: 'price_1MXyBWC11AqXD4da9v0LHxSI' }],
        expand: ['latest_invoice.payment_intent']
    });

    if (
        !subscription.latest_invoice ||
        typeof subscription.latest_invoice === 'string' ||
        !subscription.latest_invoice.payment_intent ||
        typeof subscription.latest_invoice.payment_intent === 'string'
    ) {
        return res.status(400).json({ error: 'An unexpected error occurred.' });
    }

    const client_secret = subscription.latest_invoice.payment_intent.client_secret;
    const status = subscription.latest_invoice.payment_intent.status;

    return res.status(200).json({ client_secret, status });
});

server.listen(3000, async () => {
    console.log('Server is running at port 3000');
});