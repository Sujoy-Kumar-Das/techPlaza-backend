import express from 'express';
import { categoryRouter } from '../modules/categories/categories.routes';
import { testRoutes } from '../modules/test';
import { userRouter } from '../modules/user/user.routes';
const router = express.Router();

const modulesRoutes = [
  { path: '/', route: testRoutes },
  { path: '/api/v1/', route: userRouter },
  { path: '/api/v1/', route: categoryRouter },
];

modulesRoutes.map((route) => router.use(route.path, route.route));

export default router;
