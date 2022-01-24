import { uuid } from 'uuidv4';
import db from '../index.js';

export default {
   save
}

async function save(transaction) {
   const trx_id = await db('transactions').insert(transaction).returning('id')
   try {
      return trx_id
   } catch (error) {
      return error
   }
}