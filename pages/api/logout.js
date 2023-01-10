import { getCookie, setCookie, deleteCookie } from "cookies-next";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(400).json({message: "method type not allowed!"})
    }

    const authValue = await getCookie('authToken', {req, res})
    await setCookie('authToken', authValue, {req, res, maxAge: 0})
    // await deleteCookie('authToken', {req, res})
    return res.status(200).json({message: "success - cookie authToken deleted!"})
}