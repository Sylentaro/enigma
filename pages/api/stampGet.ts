import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client'
import {Stamp} from "../../tstypes/types";

// const prisma = new PrismaClient()

export async function handler(req:NextApiRequest, res: NextApiResponse): Promise<any> {
    if (req.method === "GET"){
        return res.status(405).json({message: "method not allowed"})
    }
    else {
        const stampData: Stamp = JSON.parse(req.body)
        if (stampData.createdAt === 'ALL') {
            const stamps = await prisma.stamp.findMany({
                where: {
                    authorId: stampData.authorId
                }
            })
            if (stamps) {
                return res.status(200).json(stamps)
            } else {
                return res.status(400).json('stamps not found')
            }
        }
        else {
            const stamps = await prisma.stamp.findMany({
                where: {
                    AND: [
                        {authorId: stampData.authorId},
                        {createdAt: stampData.createdAt}
                    ]
                }
            })
            // stamps.forEach((item) => {
            //
            // })
            if (stamps) {
                return res.status(200).json(stamps)
            } else {
                return res.status(400).json('stamps not found')
            }
        }
    }    
}

export default handler;