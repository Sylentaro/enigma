import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const boardData = await JSON.parse(req.body)
        if (boardData.TYPE === 'TITLECHANGE') {
            const updateBoard = await prisma.board.updateMany({
                where: {
                    viewId: boardData.viewId
                },
                data: {
                    title: boardData.title
                }
            })
            res.status(200).json({msg: "Board Updated"})
        }
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}