import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    await fakeUsersRepository.create({
      name: 'Pedro Filipe',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotPasswordEmailService.execute({ email: 'pedro@gmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover non-existent user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({ email: 'pedro@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Filipe',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    await sendForgotPasswordEmailService.execute({ email: 'pedro@gmail.com' });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
