import multer from 'multer';
import { AppError } from '../utils/AppError.js';
import path from 'path';

// ✅ IMPORTANT: Use memoryStorage for buffer upload to Cloudinary
const storage = multer.memoryStorage();

// ✅ File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only images, PDF, and DOC files are allowed.', 400));
  }
};

// ✅ Multer upload instance with memory storage
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

// ✅ For multiple file uploads with specific field names
export const uploadFields = upload.fields([
  { name: 'candidatePhoto', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'depositSlip', maxCount: 1 },
  { name: 'profilePicture', maxCount: 1 },
]);

// ✅ For single file upload
export const uploadSingle = upload.single('file');

// ✅ For multiple files with same field
export const uploadArray = upload.array('files', 5);