import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

import AppError from '../error/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userFindByEmailExists = await usersRepository.findbyEmail(email);

    if (userFindByEmailExists) {
      throw new AppError('E-mail já utilizado.');
    }

    const passwordEncrypted = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
