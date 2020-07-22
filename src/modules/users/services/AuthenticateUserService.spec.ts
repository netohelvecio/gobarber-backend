import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'João Francisco',
      email: 'joaofrancisco@gmail.com',
      password: '123456',
    });

    const authentication = await authenticateUserService.execute({
      email: 'joaofrancisco@gmail.com',
      password: '123456',
    });

    expect(authentication).toHaveProperty('token');
    expect(authentication.user).toEqual(user);
  });

  it('should not be able to authenticate wrong password', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'joaofrancisco@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate', async () => {
    await createUserService.execute({
      name: 'João Francisco',
      email: 'joaofrancisco@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'joaofrancisco@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
