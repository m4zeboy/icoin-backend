import TransactionsModel from '../../../db/models/transaction.js'
import CoinsModel from '../../../db/models/coin.js'
import UsersModel from '../../../db/models/user.js'

export default {
   index,
   transaction
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
   console.log(balance)

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
         return res.status(200).json({ message: "Successful transaction" })
      }
   }
}