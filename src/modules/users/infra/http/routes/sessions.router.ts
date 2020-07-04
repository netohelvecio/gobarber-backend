import { container } from 'tsyringe';
import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = container.resolve(AuthenticateUserService);

  const authResponse = await authenticateUserService.execute({
    email,
    password,
  });

  delete authResponse.user.password;

  return response.json(authResponse);
});

export default sessionsRouter;
