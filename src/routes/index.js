import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./users.routers";
import artRoutes from "./arts.routes";

const router = express.Router();

// Route

router.use("/docs", docrouter);
router.use("/users", userRoute);
router.use("/arts", artRoutes);


export default router;
