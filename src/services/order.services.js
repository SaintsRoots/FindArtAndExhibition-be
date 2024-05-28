import Cart from '../models/cart.model';
import Order from '../models/order.model';
import OrderPayment from '../models/orderPayment.model';
import mongoose from 'mongoose';

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
    const orders = await Order.find({ user: userId }).populate('items.product');
    return orders;
}
export const allOrder = async () => {
    const orders = await Order.find().populate('items.product');
    return orders;
}

export const getOrder = async (orderId) => {
    const order = await Order.findById(orderId).populate('items.product');
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
}