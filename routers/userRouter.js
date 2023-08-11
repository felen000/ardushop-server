import Router from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
let router = new Router();

router.get('/:id', authMiddleware, UserController.getUser)
router.put('/edit', authMiddleware, UserController.updateUser)
export default router;
