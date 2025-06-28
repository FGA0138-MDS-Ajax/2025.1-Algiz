import multer from 'multer';
const storage = multer.memoryStorage(); // usaremos buffer
export const upload = multer({ storage });
export const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Erro ao fazer upload do arquivo.' });
    }
    next();
  });
};