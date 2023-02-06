import prisma from '../../prisma/client'

// const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        // const accountData = JSON.parse(req.body);
        // const savedAccount = await prisma.user.create({
        //     data: accountData
        // })
        const body = req.body
        const accountData = JSON.parse(body);

        const savedAccount = await prisma.user.create({
            data: accountData
        })
    
        res.status(200).json({msg: "Account created!"}) 
        // const savedAccount = await prisma.user.create({
        //     data: body
        // })
        
    }
    else {
        res.status(400).json({message: "Method not allowed"})
    }
    // if (req.method != "POST") {
    //     return res.status(405).json({message: "Method not allowed"})
    // }

    // const accountData = JSON.parse(req.body);
    // const savedAccount = await prisma.user.create({
    //     data: accountData
    // })
    // res.status(200).json("DUPA")
    // res.json(savedAccount)
}