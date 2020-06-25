import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentInSamedate = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointmentInSamedate || null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;