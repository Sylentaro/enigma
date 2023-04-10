import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const taskData = await JSON.parse(req.body)

        const tasks = await prisma.task.findMany({
            where: {
                authorId: taskData.authorId
            },
            orderBy: { id: 'asc' }
        })

        res.status(200).json(tasks)
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}