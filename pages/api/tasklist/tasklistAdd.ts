import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const tasklistData = await JSON.parse(req.body)

        const savedTasklist = await prisma.taskList.create({
            data: tasklistData
        })

        res.status(200).json({msg: "Tasklist Created"})
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}