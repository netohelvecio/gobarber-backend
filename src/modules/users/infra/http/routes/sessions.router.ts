import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();

  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const authResponse = await authenticateUserService.execute({
    email,
    password,
  });

  delete authResponse.user.password;

  return response.json(authResponse);
});

export default sessionsRouter;
