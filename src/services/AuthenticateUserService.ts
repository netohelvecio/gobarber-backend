import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

import authConfig from '../config/auth';

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
      throw new Error('E-mail inválido.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Senha inválida.');
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expires,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
