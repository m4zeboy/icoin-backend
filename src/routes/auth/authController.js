import UsersModel from '../../../db/models/user.js';
import generateJWT from './generateJWT.js'
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4'


export default {
   register,
   login
}

async function register(req, res) {
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

async function login(req, res) {
   const { name, password } = req.body;

   if (!(name && password)) {
      return res.status(400).json({ message: "Missing values" })
   } else {
      const userExist = await UsersModel.findByName(name);
      if (!userExist) {
         return res.status(404).json({ message: "User not exists or username is wrong." })
      } else {
         if (bcrypt.compare(password, userExist.password)) {
            const jwt = generateJWT(userExist)
            return res.status(200).json({ message: "logged In", token: jwt })
         } else {
            return res.status(401).json({ message: "Password is wrong." })
         }
      }
   }
}