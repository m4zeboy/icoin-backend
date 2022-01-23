import { uuid } from "uuidv4";
import OrdersModel from '../../../db/models/order.js'

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
      user_id: decodedToken.id,
      user_name: decodedToken.name,
      approved: false
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

   if (finded_order) {
      const approved_order = await OrdersModel.approve(order_id)
      try {
         console.log(approved_order)
         return res.status(200).json(approved_order[0])
      } catch (error) {
         return res.status(500).json({ message: error.message })
      }
   } else {
      return res.status(404).json({ message: "Incorrect ID, please try again." })
   }
}