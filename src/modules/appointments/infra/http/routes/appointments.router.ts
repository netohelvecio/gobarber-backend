import { Router } from 'express';

import authentication from '@shared/infra/http/middlewares/authentication';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(authentication);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
