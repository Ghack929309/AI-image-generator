
export async function GET(request: Request) {
  const env = process.env.NODE_ENV === 'production'? process.env.GET_IMAGES :'http://localhost:7071/api/getImage'

    const response = await fetch(
      `${env}`,
      {
        cache: "no-store",
      }
    );
  
    const blob = await response.blob();
    const textData = await blob.text();
  
    const data = JSON.parse(textData);
  
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  }