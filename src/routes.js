import express from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';

const routes = express.Router();

routes.get('/', (req, res) => res.json({ message: 'Hello VUTTR!!!' }));

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/sessions', SessionController.store);

// Remover a linha de baixo para desabilitar que as rotas sejam acessíveis
// apenas com o token JWT.
routes.use(authMiddleware);

routes.get('/tools', ToolController.index);
routes.post('/tools', ToolController.store);
routes.put('/tools/:id', ToolController.update);
routes.delete('/tools/:id', ToolController.delete);

export default routes;
