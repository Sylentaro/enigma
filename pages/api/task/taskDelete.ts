import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const taskData = await JSON.parse(req.body)

        const deletedTask = await prisma.task.delete({
            where: {
                id: taskData.id
            }
        })

        res.status(200).json({msg: "Task Deleted"})
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}