import Router from "express";
import ProductController from "../controllers/ProductController.js";
import SellerProductController from "../controllers/SellerProductController.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
let router = new Router();

router.get("/all", ProductController.getAll);
router.get("/bestsellers", ProductController.getBestsellers);
router.get("/check", ProductController.isInCart);
router.get("/seller/all/:sellerId", SellerProductController.getAll);
router.post("/seller/create", roleMiddleware(['SELLER']), SellerProductController.create);
router.delete("/seller/delete/:id", roleMiddleware(['SELLER']), SellerProductController.delete);
router.put("/seller/update/:id", roleMiddleware(['SELLER']), SellerProductController.update);
router.get("/:id", ProductController.getOne);
export default router;
