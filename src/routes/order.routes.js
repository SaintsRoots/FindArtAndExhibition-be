import express from 'express';
import authMiddleware from "../middleware/authMiddleware"
import fileUpload from "../helper/multer"
import { checkoutOrder, getOrdersByUser, getOrders, getOrderById } from '../controllers/order.controller';

const orderRouter = express.Router();

// Route for checkout
orderRouter.post('/:cartId', authMiddleware, fileUpload.single("files"), checkoutOrder);
orderRouter.get('/owner', authMiddleware, getOrdersByUser);
orderRouter.get('/', authMiddleware, getOrders);
orderRouter.get('/:orderId:', authMiddleware, getOrderById);



export default orderRouter;
