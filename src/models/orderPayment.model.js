import mongoose from 'mongoose';

const orderPaymentSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.ObjectId,
            ref: 'Order',
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const OrderPayment = mongoose.models.OrderPayment || mongoose.model('OrderPayment', orderPaymentSchema);

export default OrderPayment;
