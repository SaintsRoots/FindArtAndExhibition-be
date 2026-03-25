import * as orderService from "../services/order.services";
import { sendEmailPersonBookedArts } from "../utils/emailTemplate";
import { stripeService } from "../services/stripe.service.js";
// import mongoose from "mongoose";
// import Order from "../models/order.model";
import Cart from "../models/cart.model";

// export const checkoutOrder = async (req, res) => {
//     try {
//         const { cartId } = req.params;
//         const { email, name } = req.User;
//         const { shippingAddress } = req.body;

//         const order = await orderService.checkout(cartId, shippingAddress);
//         // Send confirmation email
//         const orderDetails = {
//             totalItems: order.totalItems,
//             totalPrice: order.totalPrice
//         };
//         sendEmailPersonBookedArts(email, name, orderDetails);
//         return res.status(200).json({
//             message: "Order created successfully",
//             data: order
//         });

//     } catch (error) {
//         console.error('Checkout error:', error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message
//         });

//     }
// };

export const checkoutOrder = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { email, name, _id: userId } = req.User;
    const { shippingAddress, successUrl, cancelUrl } = req.body;

    // Validate required URLs for Stripe
    if (!successUrl || !cancelUrl) {
      return res.status(400).json({
        message:
          "Success URL and Cancel URL are required for payment processing",
      });
    }

    const cart = await Cart.findById(cartId).populate("items.product");
    if (!cart) {
      throw new Error("Cart not found");
    }

    // const order = await orderService.checkout(cartId, shippingAddress);

    const stripeSession = await stripeService.createCheckoutSession(
      cartId,
      cart.totalPrice,
      "usd",
      successUrl,
      cancelUrl,
      shippingAddress
    );

    // Update order with Stripe session ID
    // await Order.findByIdAndUpdate(
    //   order._id,
    //   { stripeSessionId: stripeSession.id },
    //   { session }
    // );

    return res.status(200).json({
      message: "Order created successfully. Redirect to payment.",
      data: {
        // order,
        paymentUrl: stripeSession.url,
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripeService.stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // await stripeService.handleWebhook(event);
    // res.json({ received: true });
    // ✅ Handle the event and get back order + user info for the email
    const result = await stripeService.handleWebhook(event);
 
    // ✅ Send confirmation email only after payment is confirmed
    if (
      event.type === "checkout.session.completed" &&
      result?.email &&
      result?.name &&
      result?.order
    ) {
      const orderDetails = {
        totalItems: result.order.totalItems ?? result.order.items?.length,
        totalPrice: result.order.totalPrice,
      };
      sendEmailPersonBookedArts(result.email, result.name, orderDetails);
    }
 
    return res.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
};

// completeCheckout
export const completeCheckout = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.completeCheckout(orderId);
    return res.status(200).json({
      message: `Order status updated to ${order.status}`,
      data: order,
    });
  } catch (error) {
    console.error("Complete checkout error:", error);
    return res.status(500).json({
      message: "Failed to change order status",
      error: error.message,
    });
  }
};

//  Controller to get an order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("idd", id);
    const order = await orderService.getOrder(id);
    return res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("Get order by ID error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all orders for a user
export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.User._id;
    const order = await orderService.getOrdersUserID(userId);
    return res.status(200).json({
      message: "Orders retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("Get orders by user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get all order

export const getOrders = async (req, res) => {
  try {
    const order = await orderService.allOrder();
    return res.status(200).json({
      message: "Orders retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getOrdersByOwner = async (req, res) => {
  const ownerId = req.User._id;
  try {
    const order = await orderService.getOrdersByOwner(ownerId);
    return res.status(200).json({
      message: "Orders retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllCustomer = async (req, res) => {
  const ownerId = req.User._id;
  try {
    const order = await orderService.getUsersByOwner(ownerId);
    return res.status(200).json({
      message: "All Customers retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
