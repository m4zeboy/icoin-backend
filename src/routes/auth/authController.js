import UsersModel from '../../../db/models/user.js';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4'
export default {
   register
}

export async function register(req, res) {
   const { name, password } = req.body;
   const hasedPassword = bcrypt.hashSync(password, 12)

   if (!(name && password)) {
      return res.status(400).json({ message: 'Missing values.' })
   }
   const userAlreadyExist = await UsersModel.findByName(name)

   if (userAlreadyExist) {
      return res.status(400).json({ message: "username already taken." })
   } else {
      const user = {
         id: uuid(),
         name,
         password: hasedPassword
      }

      const accountIDReturned = await UsersModel.save(user)

      try {
         return res.status(201).json(accountIDReturned[0])
      } catch (error) {
         return res.status(500).json(error)
      }
   }
}