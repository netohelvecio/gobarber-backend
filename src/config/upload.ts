import { diskStorage } from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const uploadConfig = {
  directory: tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileTypes = /jpeg|jpg|png/;

      const mimeType = fileTypes.test(file.mimetype);
      const extensionFilename = fileTypes.test(
        path.extname(file.originalname).toLowerCase(),
      );

      if (mimeType && extensionFilename) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      }

      return callback(
        new Error('Somente arquivos de imagems válidos (jpeg-jpg-png).'),
        file.filename,
      );
    },
  }),
};

export default uploadConfig;
