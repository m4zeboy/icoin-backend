import { Router } from 'express';
import WalletController from './WalletController.js'
const router = Router();


router.get('/', WalletController.index)
router.patch('/transaction', WalletController.transaction)
router.get('/transaction', WalletController.history)

export default router