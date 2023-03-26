export async function GET(request: Request) {
    // connect to microsoft azure
    const env =  process.env.GENERATE_SUGGESTION

    try {
        const res = await fetch(`${env}`,{
            cache:"no-store",
        
        })
        const textData = await res.text()
        return new Response(JSON.stringify(textData.trim()),
        {
            status:200
        })
        
    } catch (error) {
       console.log(error)
        return new Response(JSON.stringify({error}))
        
    }
  
  }
  