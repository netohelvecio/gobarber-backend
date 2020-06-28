import { Router } from 'express';

import appointmentsRouter from './appointments.router';
import usersRouter from './users.router';
import sessionssRouter from './sessions.router';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionssRouter);

export default routes;
