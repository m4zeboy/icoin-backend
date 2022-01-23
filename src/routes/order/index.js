import { Router } from "express";
import OrderController from "./OrderController.js";
const router = Router();

router.post('/place/:quantity', OrderController.place)

export default router;