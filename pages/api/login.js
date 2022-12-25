import { Cookies } from "js-cookie"
import { NextApiRequest, NextApiResponse} from "next"
import { PrismaClient } from "@prisma/client"
import jwt from 'jwt-simple'

const client = new PrismaClient()

export default async function loginCheck(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "method not allowed"})
    }
    const loginData = JSON.parse(req.body);

    const user = await client.user.findOne({
        where: {
          name: req.body.name,
          email: req.body.email,
        },
      })
      if (!user) {
        throw new Error('Nieprawidłowa nazwa użytkownika lub hasło')
      }
      // Generujemy token za pomocą jwt-simple
      const token = jwt.encode({ userId: user.id }, process.env.JWT_SECRET)
      Cookies.set('token', token)
}