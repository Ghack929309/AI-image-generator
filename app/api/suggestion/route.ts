export async function GET(request: Request) {
    // connect to microsoft azure
    const env = process.env.NODE_ENV === 'production'? process.env.GENERATE_SUGGESTION :'http://localhost:7071/api/getChatGPTSuggestion'

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
       
        return new Response(JSON.stringify({error}))
        
    }
  
  }
  