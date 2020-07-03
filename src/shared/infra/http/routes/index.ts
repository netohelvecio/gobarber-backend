import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.router';
import usersRouter from '@modules/users/infra/http/routes/users.router';
import sessionssRouter from '@modules/users/infra/http/routes/sessions.router';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionssRouter);

export default routes;
