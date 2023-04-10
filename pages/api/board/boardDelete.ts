import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const boardData = await JSON.parse(req.body)

        const deletedBoard = await prisma.board.delete({
            where: {
                viewId: boardData.viewId
            }
        })

        res.status(200).json({msg: "Board Deleted"})
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}