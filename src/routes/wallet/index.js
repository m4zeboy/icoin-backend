import { Router } from 'express';
import WalletController from './WalletController.js'
const router = Router();


router.get('/', WalletController.index)
router.patch('/transaction', WalletController.transaction)

export default router