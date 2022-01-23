import db from '../index.js';

export default {
   save
}

async function save(order) {
   const order_id = await db('orders').insert(order).returning('order_id')
   try {
      return order_id
   } catch (error) {
      return error
   }
}