import { Router } from 'express';
import WalletController from './WalletController.js'
const router = Router();

router.patch('/transaction', WalletController.transaction)

export default router