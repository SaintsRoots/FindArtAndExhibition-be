import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./users.routers";
import artRoutes from "./arts.routes";
import cartRouter from "./cart.routes";
import orderRouter from "./order.routes";
import postRoutes from "./blogs.routes";
import messageRoutes from "./contacts.routes";
import testimonialRoutes from "./testimonials.routes";

const router = express.Router();

// Route

router.use("/docs", docrouter);
router.use("/users", userRoute);
router.use("/arts", artRoutes);
router.use("/cart", cartRouter);
router.use("/checkout", orderRouter);
router.use("/posts", postRoutes);
router.use("/messages", messageRoutes);
router.use("/testimonials", testimonialRoutes);


export default router;
