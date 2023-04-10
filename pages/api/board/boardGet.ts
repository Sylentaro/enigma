import type { NextApiRequest, NextApiResponse} from "next"
import prisma from '../../../prisma/client'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const boardData = await JSON.parse(req.body)

        const boards = await prisma.board.findMany({
            where: {
                authorId: boardData.authorId
            },
            orderBy: { id: 'asc' }
        })

        res.status(200).json(boards)
    }
    else {
        res.status(400).json({Yone: "Yones"})
    }
}