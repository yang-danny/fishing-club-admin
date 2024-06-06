import Stripe from "stripe";
export const config = {
  api: {
    bodyParser: false,
  },
};
export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  // apiVersion: '2022-11-15',
  typescript: true,
});