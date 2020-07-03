import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UsersRepository from '@modules/users/infra/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

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
