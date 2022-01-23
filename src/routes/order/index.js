import { Router } from "express";
import OrderController from "./OrderController.js";
const router = Router();

router.post('/place/:quantity', OrderController.place)
router.post('/verify/:order_id', OrderController.verify)

export default router;