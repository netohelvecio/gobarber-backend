import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Filipe',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ password: '987654', token });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('987654');
    expect(generateHash).toHaveBeenCalledWith('987654');
  });

  it('should not be able to reset password with non-existent token', async () => {
    await expect(
      resetPasswordService.execute({ password: '987654', token: '' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existent user', async () => {
    const { token } = await fakeUserTokensRepository.generate('10');

    await expect(
      resetPasswordService.execute({ password: '987654', token }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if pass more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Filipe',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({ password: '987654', token }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
