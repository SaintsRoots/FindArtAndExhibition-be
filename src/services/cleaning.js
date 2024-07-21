import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dbConnector from "../app"
import Order from '../models/order.model';
import Cart from '../models/cart.model';



dotenv.config();


const truncateCollection = async () => {
    await dbConnector; 

    try {
        await Order.deleteMany({});
        console.log('Truncated  collection successfully');
    } catch (error) {
        console.error('Error truncating  collection:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

(async () => {
    await truncateCollection();
})();