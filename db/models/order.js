import db from '../index.js';

export default {
   save,
   approve,
   findById
}

async function save(order) {
   const order_id = await db('orders').insert(order).returning('order_id')
   try {
      return order_id
   } catch (error) {
      return error
   }
}

async function approve(order_id) {
   const approve = await db("orders").where({ order_id }).update({
      approved: true
   }).returning("approved")
   try {
      return approve
   } catch (error) {
      return error
   }
}

async function findById(order_id) {
   const finded_order = await db('orders').select().where({ order_id }).first()
   try {
      return finded_order
   } catch (error) {
      return error
   }
}