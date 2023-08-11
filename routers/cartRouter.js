import Router from 'express';
import CartController from '../controllers/CartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
let router = new Router();

router.post('/add', authMiddleware, CartController.add);
router.delete('/remove', authMiddleware, CartController.remove);
router.get('/:id', authMiddleware, CartController.getProducts);
router.patch('/count', authMiddleware, CartController.setProductCount)
export default router;
