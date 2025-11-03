import Stripe from "stripe";
import * as orderService from "../services/order.services.js";
import Order from "../models/order.model.js";
import OrderPayment from "../models/orderPayment.model.js";
import Cart from "../models/cart.model.js";

export class StripeService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createCheckoutSession(
    cartId,
    amount,
    currency,
    successUrl,
    cancelUrl,
    shippingAddress
  ) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: "Art Purchase",
                description: "Purchase of artwork from your store",
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          cartId,
          shippingAddress,
        },
        payment_intent_data: {
          capture_method: "automatic",
        },
      });

      return session;
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      throw error;
    }
  }

  async handleWebhook(event) {
    switch (event.type) {
      case "checkout.session.completed":
        await this.handleCheckoutSessionCompleted(event.data.object);
        break;
      case "checkout.session.expired":
        await this.handleCheckoutSessionExpired(event.data.object);
        break;
      case "payment_intent.succeeded":
        await this.handlePaymentIntentSucceeded(event.data.object);
        break;
      case "payment_intent.payment_failed":
        await this.handlePaymentIntentFailed(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  async handleCheckoutSessionCompleted(session) {
    try {
      const { cartId, shippingAddress } = session.metadata;

      console.log(
        "Payment successful for cart handleCheckoutSessionCompleted @@@@@@@@@@@@@@@@",
        cartId
      );

      await orderService.checkout(cartId, shippingAddress);
    } catch (error) {
      console.error("Error handling checkout session completed:", error);
      throw error;
    }
  }

  async handleCheckoutSessionExpired(session) {
    const cartId = session.metadata.cartId;

    await OrderPayment.findOneAndUpdate(
      { cartId: cartId },
      { paymentStatus: "failed" }
    );

    await Cart.findByIdAndUpdate(cartId, { status: "cancelled" });

    console.log(`Checkout session expired for order: ${cartId}`);
  }

  async handlePaymentIntentSucceeded(paymentIntent) {
    console.log("Payment successfully", paymentIntent);
  }

  async handlePaymentIntentFailed(paymentIntent) {
    const cartId = paymentIntent.metadata.cartId;

    if (cartId) {
      await OrderPayment.findOneAndUpdate(
        { order: cartId },
        { paymentStatus: "failed" }
      );

      await Order.findByIdAndUpdate(cartId, { status: "cancelled" });
    }

    console.log("Payment intent failed:", paymentIntent.id);
  }
}

export const stripeService = new StripeService();
