import express from "express";
import Auth from "../middleware/Auth"
import fileUpload from "../helper/multer"
import { createArts, deleteArts, getAllArts, getArtsById, getArtsByOwner, updateArts } from "../controllers/arts.cotrollers";

const artRoutes = express.Router();


artRoutes.post("/", fileUpload.single("image"), Auth, createArts);
artRoutes.get("/", getAllArts);
artRoutes.get("/:id", getArtsById);
artRoutes.get("/:id/owner", getArtsByOwner);
artRoutes.delete("/:id", deleteArts);
artRoutes.put("/:id", updateArts);

export default artRoutes