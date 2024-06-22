import express from 'express';
import { testRoutes } from '../modules/test';
import { userRouter } from '../modules/user/user.routes';
const router = express.Router();

const modulesRoutes = [
  { path: '/', route: testRoutes },
  { path: '/api/v1/', route: userRouter },
];

modulesRoutes.map((route) => router.use(route.path, route.route));

export default router;
