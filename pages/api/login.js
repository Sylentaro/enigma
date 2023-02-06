import prisma from '../../prisma/client'
import jwt from 'jwt-simple'

// const prisma = new PrismaClient()

export default async function loginCheck(req, res) {
  if (req.method !== "POST") {
      return res.status(400).json({message: "method not allowed"})
  }
  const loginData = JSON.parse(req.body)
  const accountFound = await prisma.user.findFirst({
    where: {
      AND: [
        {name: loginData.name},
        {password: loginData.password},
        {email: loginData.email}
      ]
    }
  })

  if (accountFound) {
    const token = jwt.encode(accountFound, 'my-secret')
    return res.status(200).json(token)
  }

  else {
    return res.status(400).json({message: "error: account not found !"})
  }
}
