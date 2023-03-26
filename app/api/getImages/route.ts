
export async function GET(request: Request) {
  const env =  process.env.GET_IMAGES

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