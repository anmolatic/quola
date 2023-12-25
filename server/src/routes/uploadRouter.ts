import { Router } from 'express';
import fs from 'fs';

import multer from 'multer';
import { OCRController } from '../lib';
import { ResponsePayload, dataSchema } from '../validators';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    console.log(_file);
    if (_file.mimetype !== 'image/png' && _file.mimetype !== 'image/jpeg') {
      return cb(new Error('File type not supported'), 'uploads/');
    }

    if (_file.size > 1024 * 1024 * 2) {
      return cb(new Error('File size too large'), 'uploads/');
    }

    cb(null, 'uploads/');
  },

  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('file');

const uploadRouter = Router();

uploadRouter.post('/analyse', async (req, res) => {
  try {
    const pomise = new Promise((resolve, reject) => {
      upload(req, res, async (err) => {
        if (err) {
          reject(err);

          return;
        }

        const file = req.file;

        if (!file) {
          reject(new Error('No file uploaded'));

          return;
        }

        const filePath = req.file?.path;

        if (!filePath) {
          reject(new Error('No file uploaded'));

          return;
        }

        const ocrData = await OCRController(filePath);

        const parsedData = dataSchema.parse(ocrData);

        if (filePath) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('File deleted');
            }
          });
        }

        const payload: ResponsePayload = {
          status: 'ok',
          data: parsedData,
          message: 'Data extracted successfully',
        };

        return resolve(payload);
      });
    });

    const data = await pomise;

    res.json(data);
  } catch (error) {
    console.error(error);

    const payload: ResponsePayload = {
      status: 'error',
      message: "Couldn't extract data from image",
    };

    res.status(500).json(payload);
  }
});

export default uploadRouter;
