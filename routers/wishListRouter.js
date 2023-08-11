import Router from "express";
import WishLIstController from "../controllers/WishLIstController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
let router = new Router();

router.post("/add", authMiddleware, WishLIstController.add);
router.delete("/remove", authMiddleware, WishLIstController.remove);
router.get("/check", authMiddleware, WishLIstController.isInList);
router.get("/:id", authMiddleware, WishLIstController.getList);

export default router;
