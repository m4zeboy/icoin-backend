import { uuid } from "uuidv4";
import OrdersModel from '../../../db/models/order.js'
import CoinsModel from '../../../db/models/coin.js'

export default {
   place,
   verify
}

async function place(req, res) {
   const { decodedToken } = req;
   const { quantity } = req.params;

   console.log(decodedToken)

   const preOrder = {
      order_id: uuid(),
      quantity,
      user_id: decodedToken.id,
      user_name: decodedToken.name,
      approved: false,
      status: 'available'
   }

   const createdOrder = await OrdersModel.save(preOrder)
   try {
      return res.status(201).json(createdOrder[0])
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}

async function verify(req, res) {
   const { decodedToken } = req;
   const { order_id } = req.params;


   const finded_order = await OrdersModel.findById(order_id)
   console.log(finded_order)

   if (finded_order) {
      if (finded_order.status === 'available') {
         const approved_order = await OrdersModel.approve(order_id)
         try {
            // emitir icoins
            for (let i = 1; i <= finded_order.quantity; i++) {
               const coin = await CoinsModel.emmit(finded_order.user_id)
            }
            return res.status(201).json({ approved: approved_order[0].approved })
         } catch (error) {
            return res.status(500).json({ message: error.message })
         }

      } else {
         return res.status(401).json({ message: "Order already approved." })
      }
   } else {
      return res.status(404).json({ message: "Incorrect ID, please try again." })
   }
}