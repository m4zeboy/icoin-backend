import { uuid } from "uuidv4";
import OrdersModel from '../../../db/models/order.js'

export default {
   place,
   approve
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

async function approve(req, res) {

}