import TransactionsModel from '../../../db/models/transaction.js'
import CoinsModel from '../../../db/models/coin.js'

export default {
   transaction
}

async function transaction(req, res) {
   const { decodedToken } = req;
   const { allotee, quantity } = req.body;

   const balance = await CoinsModel.findCoinsByCurrentOwner(decodedToken.id)
   console.log(balance)

   if (quantity > balance.length) {
      return res.status(401).json({ message: "You don't have enough balance." })
   }
}