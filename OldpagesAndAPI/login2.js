import cookie from "cookie"
import { NextApiRequest, NextApiResponse} from "next"
import { PrismaClient } from "@prisma/client"
import jwt from 'jwt-simple'

const prisma = new PrismaClient()

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
    const token = jwt.encode({id: accountFound.id, name: accountFound.name}, 'my-secret')
    if (loginData.remember) {
      try {
        res.setHeader(
        "Set-Cookie", 
        cookie.serialize("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          // maxAge: 3600,
          sameSite: "strict",
          path: "/",
        }))
        res.statusCode = 200;
        res.json({success: true}) 
      }
      catch(error) {
        res.status(400).json({message: "error during serializing cookie with jwt: " + error})
      }
    }
    else {
      try {
        res.setHeader(
        "Set-Cookie", 
        cookie.serialize("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 3600,
          sameSite: "strict",
          path: "/",
        }))
        res.statusCode = 200;
        res.json({success: true})
      }
      catch(error) {
        res.status(400).json({message: "error during serializing cookie with jwt: " + error})
      }
    }
      
    return res.status(200).json({message: "success, account token saved: " + token})
  }
  else {
    return res.status(400).json({message: "account not found !"})
  }
}