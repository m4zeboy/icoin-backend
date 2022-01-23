import jwt from 'jsonwebtoken'
export default function (user) {
   const payload = {
      id: user.id,
      name: user.name
   }

   const secret = process.env.JWT_SECRET

   const options = {
      expiresIn: "2h"
   }

   return jwt.sign(payload, secret, options)
}