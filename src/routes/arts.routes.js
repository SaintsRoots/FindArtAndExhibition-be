import express from "express";
import authMiddleware from "../middleware/authMiddleware"
import fileUpload from "../helper/multer"
import { createArts, deleteArts, getAllArts, getArtsByCategory, getArtsById, getArtsByLoggedUser, getArtsByOwner, getArtsByTitle, updateArts } from "../controllers/arts.cotrollers";

const artRoutes = express.Router();


artRoutes.post("/", fileUpload.single("image"), authMiddleware, createArts);
artRoutes.get("/", getAllArts);
artRoutes.get("/category/:category", getArtsByCategory);
artRoutes.get("/name/:name", getArtsByTitle);
artRoutes.get("/owner", authMiddleware, getArtsByLoggedUser);
artRoutes.get("/:id", getArtsById);
artRoutes.get("/owner/:id", getArtsByOwner); 
artRoutes.delete("/:id", deleteArts);
artRoutes.put("/:id", fileUpload.single("image"), authMiddleware, updateArts);

export default artRoutes