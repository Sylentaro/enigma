import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const tasklistData = await JSON.parse(req.body)

        const tasklists = await prisma.taskList.findMany({
            where: {
                authorId: tasklistData.authorId
            },
            orderBy: { id: 'asc' }
        })

        res.status(200).json(tasklists)
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}