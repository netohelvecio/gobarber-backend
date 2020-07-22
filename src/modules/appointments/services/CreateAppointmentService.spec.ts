import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreatAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      provider_id: '1',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a two appointments on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointmentService.execute({
      provider_id: '1',
      date: appointmentDate,
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '2',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
