export default async function fetchSuggestion(){
    const res = await fetch('/api/suggestion',{
        cache:'no-store'
    })
    return await res.json()
}