import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const tasklistData = await JSON.parse(req.body)
        if (tasklistData.TYPE === 'TITLECHANGE') {
            const updateTasklist = await prisma.taskList.updateMany({
                where: {
                    id: tasklistData.id
                },
                data: {
                    title: tasklistData.title
                }
            })
            res.status(200).json({msg: "Tasklist Updated"})
        }
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}