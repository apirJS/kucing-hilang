import { Router } from 'express';
import { signInHandler } from '../controllers/userController';

const router = Router();

router.get('/posts/:userId/lostcats/:id');
router.get('/posts/:userId/foundcats/:id');

export default router;
