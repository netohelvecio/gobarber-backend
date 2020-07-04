import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authResponse = await authenticateUserService.execute({
      email,
      password,
    });

    delete authResponse.user.password;

    return response.json(authResponse);
  }
}
