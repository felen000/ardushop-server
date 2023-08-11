import Router from 'express';
import AuthController from '../controllers/AuthController.js';
import { check } from 'express-validator';
// import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

let router = new Router();

router.post('/registration', [
	check('username', 'Имя пользователя не должно быть пустым').notEmpty(),
	check('username', 'Имя пользователя должно быть не менее 4').isLength({min: 3}),
	check('email', 'Введите почту').isEmail(),
	check('password', 'Пароль должен быть больше 4 и меньше 10').isLength({min: 4, max: 10})
], AuthController.registration);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/refresh', AuthController.refresh);
router.get('/users', roleMiddleware(['ADMIN']), AuthController.getUsers)

export default router;
