import Cart from '../models/cart.model';
import Order from '../models/order.model';
import Arts from '../models/arts.model';
import OrderPayment from '../models/orderPayment.model';
import mongoose from 'mongoose';
import User from '../models/user.models';

export const checkout = async (cartId, shippingAddress, paymentMethod) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const cart = await Cart.findById(cartId).populate('items.product');
    if (!cart) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'Cart not found' });
    }

    // Reduce available_arts for each product in the cart
    for (let item of cart.items) {
        const product = item.product;
        if (product.available_arts < item.quantity) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: `Not enough stock for ${product.name}` });
        }
        product.available_arts -= item.quantity;
        await product.save({ session });
    }

    const order = new Order({
        user: cart.user,
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalItems: cart.totalItems,
        shippingAddress: shippingAddress,
    });

    await order.save({ session });

    const payment = new OrderPayment({
        order: order._id,
        paymentMethod: paymentMethod,
        paymentStatus: 'pending',
        amount: cart.totalPrice,
    });

    await payment.save({ session });

    // Update cart status to 'completed'
    cart.status = 'completed';
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
}

// get all order

export const getOrdersUserID = async (userId) => {
    const orders = await Order.find({ user: userId }).populate('items.product') .populate({ path: 'user',select: 'name email img' });

    return orders;
}
export const allOrder = async () => {
    const orders = await Order.find()
        .populate({
            path: 'items.product',
            populate: {
                path: 'owner',
                select: 'name'
            }
        })
        .populate({ path: 'user',select: 'name email img' });
    return orders;
};


export const getOrder = async (orderId) => {
    const order = await Order.findById(orderId).populate('items.product') .populate({ path: 'user',select: 'name email img' });

    if (!order) {
        throw new Error('Order not found');
    }
    return order;
}

export const getOrdersByOwner = async (ownerId) => {
    // Find all products owned by the owner
    const products = await Arts.find({ owner: ownerId });

    // Get all product IDs owned by the owner
    const productIds = products.map(product => product._id);

    // Find all orders that contain these products
    const orders = await Order.find({ 'items.product': { $in: productIds } }).populate('items.product') .populate({ path: 'user',select: 'name email img' });

    if (!orders) {
        throw new Error('Orders not found');
    }
    return orders;
};

export const getUsersByOwner = async (ownerId) => {
    try {
        // Find all products owned by the owner
        const products = await Arts.find({ owner: ownerId });

        // Get all product IDs owned by the owner
        const productIds = products.map(product => product._id);

        // Find all orders that contain these products
        const orders = await Order.find({ 'items.product': { $in: productIds } }).populate('items.product');

        if (!orders || orders.length === 0) {
            throw new Error('Orders not found');
        }

        // Extract unique user IDs from orders
        const userIds = [...new Set(orders.map(order => order.user.toString()))];

        // Populate user details
        const users = await User.find({ _id: { $in: userIds } });

        // Extract ordered products details
        const orderedProducts = orders.flatMap(order => order.items.map(item => item.product));

        return { users, orderedProducts };
    } catch (error) {
        console.error('Error retrieving users and products:', error);
        throw error;
    }
};