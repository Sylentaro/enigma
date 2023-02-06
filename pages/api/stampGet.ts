import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client'

// const prisma = new PrismaClient()

export async function handler(req:NextApiRequest, res: NextApiResponse): Promise<any> {
    if (req.method === "GET"){
        return res.status(405).json({message: "method not allowed"})
    }
    else {
        const stampData = JSON.parse(req.body)

        const stamps = await prisma.stamp.findMany({
            where: {
                AND: [
                    {authorId: stampData.authorId},
                    {createdAt: stampData.createdAt}
                ]
            }
        })

        if (stamps) {
            return res.status(200).json(stamps) 
        }
        else {
            return res.status(400).json('stamps not found') 
        }
    }    
}

export default handler;