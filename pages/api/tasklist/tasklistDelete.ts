import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const tasklistData = await JSON.parse(req.body)

        const deletedTasklist = await prisma.taskList.delete({
            where: {
                id: tasklistData.id
            }
        })

        res.status(200).json({msg: "Tasklist Deleted"})
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}