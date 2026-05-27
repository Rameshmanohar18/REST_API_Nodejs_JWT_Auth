import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import auditMiddleware from '../middleware/auditMiddleware.js';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.use(authMiddleware);
router.use(auditMiddleware);

router.post('/', roleMiddleware('admin'), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', roleMiddleware('admin'), deleteUser);

export default router;
