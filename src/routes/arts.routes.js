import express from "express";
import Auth from "../middleware/authMiddleware"
import fileUpload from "../helper/multer"
import { createArts, deleteArts, getAllArts, getArtsByCategory, getArtsById, getArtsByOwner, getArtsByTitle, updateArts } from "../controllers/arts.cotrollers";

const artRoutes = express.Router();


artRoutes.post("/", fileUpload.single("image"), Auth, createArts);
artRoutes.get("/", getAllArts);
artRoutes.get("/:id", getArtsById);
artRoutes.get("/category/:category", getArtsByCategory);
artRoutes.get("/name/:name", getArtsByTitle);
artRoutes.get("/:id/owner", getArtsByOwner);
artRoutes.delete("/:id", deleteArts);
artRoutes.put("/:id", fileUpload.single("image"), Auth, updateArts);

export default artRoutes