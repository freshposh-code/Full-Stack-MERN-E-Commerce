const Stripe = require('stripe')

const stripe = Stripe(process.env.REACT_VITE_APP_STRIPE_SECRET_KEY)

module.exports = stripe