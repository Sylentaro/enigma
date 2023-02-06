import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const stampData = await JSON.parse(req.body)

        const savedStamp = await prisma.stamp.create({
            data: stampData
        })

        res.status(200).json({msg: "Stamp created!"})
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}