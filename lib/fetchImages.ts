export default async function fetchImages(){
    const res = await fetch('/api/getImages',{
        cache:'no-store'
    })
    return await res.json()
}