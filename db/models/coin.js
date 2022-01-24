import { uuid } from 'uuidv4'
import db from '../index.js'

export default {
   emmit,
   findCoinsByCurrentOwner,
   update,
}

async function emmit(current_owner) {
   const pre_coin = {
      id: uuid(),
      current_owner
   }

   const coin_id = await db("coins").insert(pre_coin).returning("id")
   try {
      return coin_id
   } catch (error) {
      return error
   }
}

async function findCoinsByCurrentOwner(current_owner) {
   const coins = await db("coins").select().where({ current_owner })
   try {
      return coins
   } catch (error) {
      return error
   }
}

async function update(changes) {
   
}