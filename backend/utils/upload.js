import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("_");
    cb(null, fileName + "_" + Date.now());
  },
});
const upload = multer({ storage });

export default upload;
