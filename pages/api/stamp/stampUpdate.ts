import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const stampData = await JSON.parse(req.body)
        if (stampData.TYPE === 'TITLECHANGE') {
            const updateStamp = await prisma.stamp.updateMany({
                where: {
                    id: stampData.id
                },
                data: {
                    title: stampData.title
                }
            })
            res.status(200).json({msg: "Stamp Updated"})
        }
        else if (stampData.TYPE === 'CONTENTCHANGE') {
            const updateStamp = await prisma.stamp.updateMany({
                where: {
                    id: stampData.id
                },
                data: {
                    content: stampData.content
                }
            })
            res.status(200).json({msg: "Stamp Updated"})
        }
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}