import express from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';

const routes = express.Router();

routes.get('/', (req, res) => res.json({ message: 'Hello VUTTR!!!' }));

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/tools', ToolController.index);
routes.post('/tools', ToolController.store);
routes.put('/tools', ToolController.update);
routes.delete('/tools', ToolController.delete);

export default routes;
