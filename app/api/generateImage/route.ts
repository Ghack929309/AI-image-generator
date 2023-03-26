import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const env =  process.env.GENERATE_IMAGE
    // we have to await request (only on next13)
    const req = await request.json()
    const prompt = req.prompt

    const res = await fetch(`${env}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({prompt})
    })
    const textData = await res.text()
    return NextResponse.json(textData)
  }
  