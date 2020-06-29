import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';

import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Usuário inexistente.');
    }

    if (user.avatar) {
      const fileUserAvatarPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(fileUserAvatarPath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(fileUserAvatarPath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
