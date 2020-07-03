import { hash } from 'bcryptjs';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userFindByEmailExists = await this.usersRepository.findByEmail(email);

    if (userFindByEmailExists) {
      throw new AppError('E-mail já utilizado.');
    }

    const passwordEncrypted = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });

    return user;
  }
}

export default CreateUserService;
