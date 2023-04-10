import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../prisma/client";
import {Stamp} from "../../../tstypes/types";
export async function handler (req: NextApiRequest, res: NextApiResponse): Promise<any> {
    if (req.method !== 'POST') {
        res.status(400).json('error')
    }
    else {
        const stampData: Stamp = JSON.parse(req.body)
        const deleteStamp = await prisma.stamp.delete({
            where: {
                id: stampData.id
            }
        })
        res.status(200).json('stamp deleted')
    }
}
export default handler