import express from 'express';
import authMiddleware from "../middleware/authMiddleware"
import fileUpload from "../helper/multer"
import { checkoutOrder, handleStripeWebhook, getOrdersByUser, getOrders, getOrderById, getOrdersByOwner, getAllCustomer, completeCheckout } from '../controllers/order.controller';

const orderRouter = express.Router();

// Route for checkout
orderRouter.post('/:cartId', authMiddleware, fileUpload.single("files"), checkoutOrder);
orderRouter.post('/stripe/webhook', handleStripeWebhook);
orderRouter.post('/:orderId/complete', authMiddleware, fileUpload.single("files"), completeCheckout);
orderRouter.get('/owner', authMiddleware, getOrdersByUser);
orderRouter.get('/artsOwner', authMiddleware, getOrdersByOwner);
orderRouter.get('/customer', authMiddleware, getAllCustomer);
orderRouter.get('/', authMiddleware, getOrders);
orderRouter.get('/:orderId', authMiddleware, getOrderById);



export default orderRouter;
