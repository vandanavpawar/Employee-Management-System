const jwt = require('jsonwebtoken')
const Admin = require('../model/adminmodel')

exports.authentication = async (req, res, next) => {

   const token = req.header('Authorization')

   if (!token) {
      return res.status(401).json({ "message": "unauthorized" })
   }

   const jwtToken = token.replace("Bearer", "").trim();

   try {
      const verified = jwt.verify(jwtToken, process.env.SECRET_KEY)

      const userData = await Admin.findOne({ username: verified.username })

      req.user = userData;
      req.token = token;
      req.userId = userData._id;

      next()
   } catch (err) {
      return res.status(401).json({ "message": err.message })
   }
}