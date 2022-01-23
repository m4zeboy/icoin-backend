import jwt from 'jsonwebtoken';

export default function (req, res, next) {
   const token = req.headers.authorization;

   if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
         if (error) {
            return res.status(401).json({ message: "Invalid token" })
         } else {
            req.decodedToken = decodedToken;
            next()
         }
      })
   }
}  