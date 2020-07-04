import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { id } = request.user;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: id,
      avatarFilename: filename,
    });

    delete user.password;

    return response.json(user);
  }
}
