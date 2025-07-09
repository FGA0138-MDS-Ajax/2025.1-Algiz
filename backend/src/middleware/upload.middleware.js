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
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Aceita o ficheiro
  } else {
    cb(new Error('Tipo de ficheiro não suportado. Apenas PDFs são permitidos.'), false);
  }
};

export const uploadData = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite de 10MB
  },
});

export default upload;