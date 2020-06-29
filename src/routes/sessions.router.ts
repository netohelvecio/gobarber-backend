import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const authResponse = await authenticateUserService.execute({
    email,
    password,
  });

  delete authResponse.user.password;

  return response.json(authResponse);
});

export default sessionsRouter;
