import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const taskData = await JSON.parse(req.body)
        if (taskData.TYPE === 'CONTENTCHANGE') {
            const updateTask = await prisma.task.updateMany({
                where: {
                    id: taskData.id
                },
                data: {
                    content: taskData.content
                }
            })
        }
        else if (taskData.TYPE === 'STATUSCHANGE') {
            const updateTask = await prisma.task.updateMany({
                where: {
                    id: taskData.id
                },
                data: {
                    status: taskData.status
                }
            })
        }
        res.status(200).json({msg: "Task Updated"})
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}