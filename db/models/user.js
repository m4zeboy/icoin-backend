import db from '../index.js'

export default {
   save,
   findByName
}

async function save(user) {
   const user_id = await db('users').insert(user).returning('id')
   try {
      return user_id
   } catch (error) {
      return error
   }
}

async function findByName(name) {
   const user = await db('users')
      .select()
      .where({ name })
      .first()

   try {
      return user
   } catch (error) {
      return error
   }
}