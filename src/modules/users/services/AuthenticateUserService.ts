import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import UsersRepository from '@modules/users/infra/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findbyEmail(email);

    if (!user) {
      throw new AppError('E-mail inválido.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Senha inválida.', 401);
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expires,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
