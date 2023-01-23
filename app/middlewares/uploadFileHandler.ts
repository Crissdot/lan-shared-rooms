import multer from 'multer';
import { extname } from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];
      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),
  limits: {
    // 10 MB
    fieldSize: 10000000,
  }
});

export { upload };
