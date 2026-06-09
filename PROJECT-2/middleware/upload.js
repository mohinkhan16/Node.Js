import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        let foldername = "uploads/";

        if (file.fieldname === "EventPoster") {
            foldername += "EventPoster";
        } else if (file.fieldname === "EventBanner") {
            foldername += "EventBanner";
        } else if (file.fieldname === "EventSpeaker") {
            foldername += "EventSpeaker";
        } else if (file.fieldname === "EventImages") {
            foldername += "EventImages";
        } else {
            foldername += "other";
        }

        fs.mkdirSync(foldername, { recursive: true });

        cb(null, foldername);
    },

    filename: (req, file, cb) => {
        const uniqueId =
            `${file.originalname}-${Date.now()}-${file.fieldname}`;

        cb(null, uniqueId);
    }
});

const fileFilter = (req, file, cb) => {

    const allowed = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "application/pdf",
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only jpg, jpeg, png and pdf files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 }
});

export default upload;
