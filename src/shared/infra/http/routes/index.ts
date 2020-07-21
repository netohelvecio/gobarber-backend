import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.router';
import usersRouter from '@modules/users/infra/http/routes/users.router';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.router';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.router';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/passwords', passwordsRouter);

export default routes;
