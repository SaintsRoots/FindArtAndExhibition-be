import * as orderService from "../services/order.services"
import { sendEmailPersonBookedArts } from "../utils/emailTemplate";

export const checkoutOrder = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { email, name } = req.User;
        const { shippingAddress, paymentMethod } = req.body;

        const order = await orderService.checkout(cartId, shippingAddress, paymentMethod);
        // Send confirmation email
        const orderDetails = {
            totalItems: order.totalItems,
            totalPrice: order.totalPrice
        };
        sendEmailPersonBookedArts(email, name, orderDetails);
        return res.status(200).json({
            message: "Order created successfully",
            data: order
        });

    } catch (error) {
        console.error('Checkout error:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });

    }
};

//  Controller to get an order by ID
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrder(orderId);
        return res.status(200).json({
            message: "Order retrieved successfully",
            data: order
        });
    } catch (error) {
        console.error('Get order by ID error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get all orders for a user
export const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.User._id;
        const order = await orderService.getOrdersUserID(userId);
        return res.status(200).json({
            message: "Orders retrieved successfully",
            data: order
        });
    } catch (error) {
        console.error('Get orders by user error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// get all order

export const getOrders = async (req, res) => {
    try {
        const order = await orderService.allOrder();
        return res.status(200).json({
            message: "Orders retrieved successfully",
            data: order
        });
    } catch (error) {
        console.error('Get orders error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const getOrdersByOwner = async (req, res) => {
    const ownerId = req.User._id;
    try {
        const order = await orderService.getOrdersByOwner(ownerId);
        return res.status(200).json({
            message: "Orders retrieved successfully",
            data: order
        });
    } catch (error) {
        console.error('Get orders error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const getAllCustomer = async (req, res) => {
    const ownerId = req.User._id;
    try {
        const order = await orderService.getUsersByOwner(ownerId);
        return res.status(200).json({
            message: "All Customers retrieved successfully",
            data: order
        });
    } catch (error) {
        console.error('Get orders error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};