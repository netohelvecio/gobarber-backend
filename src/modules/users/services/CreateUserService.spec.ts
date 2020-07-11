import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreatAppointment', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'João Francisco',
      email: 'joaofrancisco@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'João Francisco',
      email: 'joaofrancisco@gmail.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'João Francisco',
        email: 'joaofrancisco@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
