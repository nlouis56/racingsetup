import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { UploadedFile } from '../api/domain';
import { authenticateToken } from '../../middleware/auth';

const router = express.Router();

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../uploads')); // Dossier où stocker les fichiers
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille de 5 Mo
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'));
    }
  },
});

/**
 * @swagger
 * /api/file/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server with authentication. Only JPEG, PNG, and PDF files are allowed, with a maximum size of 5MB.
 *     tags: [File]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadedFile'
 *       400:
 *         description: Bad request or invalid file type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       401:
 *         description: Unauthorized, missing or invalid token
 */

router.post('/upload', authenticateToken, upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'Aucun fichier téléchargé' });
        return;
    }
  
    res.status(200).json({
      filename: req.file.filename,
      path: req.file.path,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  });

/**
 * @swagger
 * /api/file/uploads/{filename}:
 *   get:
 *     summary: Access a downloaded file
 *     description: Retrieve a file from the server by providing its filename.
 *     tags: [File]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to retrieve
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/uploads/:filename', (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../../../uploads', filename);
  res.sendFile(filePath);
});

export default router;
