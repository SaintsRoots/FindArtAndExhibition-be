import multer from "multer";
import path from "path";

const fileUpload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".gif" &&
            ext !== ".tif" &&
            ext !== ".webp" &&
            ext !== ".bmp" &&
            ext !== ".tiff" &&
            ext !== ".pdf" &&
            ext !== ".doc" &&
            ext !== ".docx" &&
            ext !== ".xls" &&
            ext !== ".xlsx" &&
            ext !== ".mp4" &&
            ext !== ".mp3" &&
            ext !== ".zip" &&
            ext !== ".rar" &&
            ext !== ".document" &&
            ext !== ".sheet" 
        ) {
            return cb(new Error("Invalid file type"), false);
        }
        cb(null, true);
    },
});
// 0784799605 muhayimana
export default fileUpload;
