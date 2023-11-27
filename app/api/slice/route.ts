
export const POST = async (req: Request) => {

    console.log(req.body)

    return Response.json({ 'res': 'success' })
}
