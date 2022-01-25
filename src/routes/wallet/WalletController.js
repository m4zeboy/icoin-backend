import TransactionsModel from '../../../db/models/transaction.js'
import CoinsModel from '../../../db/models/coin.js'
import UsersModel from '../../../db/models/user.js'
import { uuid } from 'uuidv4';

export default {
   index,
   transaction,
   history
}

async function index(req, res) {
   const { id } = req.decodedToken;

   const wallet = await CoinsModel.findCoinsByCurrentOwner(id)

   return res.status(200).json(wallet);
}

async function transaction(req, res) {
   const { decodedToken } = req;
   const { allotee, quantity } = req.body;

   const balance = await CoinsModel.findCoinsByCurrentOwner(decodedToken.id)

   if (quantity <= 0) {
      return res.status(404).json({ message: "Transaction amount cannot be negative or zero." })
   } else {
      if (quantity > balance.length) {
         return res.status(401).json({ message: "You don't have enough balance." })
      } else {
         const findedAllotee = await UsersModel.findByName(allotee);
         if (!findedAllotee) {
            return res.status(404).json({ message: "Allotee does not exists." })
         } else {
            // transferir
            for (let i = 1; i <= quantity; i++) {
               await CoinsModel.update(balance[i].id, { current_owner: findedAllotee.id, updated_at: new Date() })
            }
            const pre_transaction = {
               id: uuid(),
               sender_id: decodedToken.id,
               sender_name: decodedToken.name,
               allotee_id: findedAllotee.id,
               allotee_name: findedAllotee.name,
               quantity
            }

            const trx = await TransactionsModel.save(pre_transaction)
            try {
               return res.status(200).json({ message: "Successful transaction" })
            } catch (error) {
               return res.status(500).json({ message: error.message })
            }
         }
      }
   }
}

async function history(req, res) {
   const { id } = req.decodedToken;
   const transactions = await TransactionsModel.index(id)
   return res.status(200).json(transactions)
}