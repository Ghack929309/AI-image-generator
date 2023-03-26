'use client'
import useSWR from 'swr'
import  { FormEvent, useState } from 'react'
import fetchSuggestion from '@/lib/fetchSuggestion'
import fetchImages from '@/lib/fetchImages'
import { Toast, toast } from 'react-hot-toast'

export default function PromptInput() {
   const [input,setInput]= useState('')
   const {data:suggestion,isLoading,isValidating,mutate}=useSWR('/api/suggestion',fetchSuggestion,{
    revalidateOnFocus:false
   })
   const {mutate:refreshImageLayout}= useSWR('/api/getImages',fetchImages,{
    revalidateOnFocus:false
   })

   

   const submitPrompt=async(useSuggestion?:boolean)=>{
    const inputPrompt = input
    setInput('')
    const prompt = useSuggestion ? suggestion : inputPrompt

   const notificationPrompt= prompt.slice(0,20)
   const notification = toast.loading(`AI is creating: ${notificationPrompt}...`)

    const res = await fetch('/api/generateImage',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({prompt})
    })
    const data = await res.json()

    if(data.error){
      toast.error(data.error,{
        id:notification
      })
    }else{
      toast.success('Image as been generated',{
        id:notification
      })
    }
    
    refreshImageLayout()
    
   }

   const submitHandler= async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
    await submitPrompt()
      
   }
   
   
  return (
    <div className="m-10">
        <form onSubmit={submitHandler} className='flex flex-col lg:flex-row shadow-md
        shadow-slate-400/10 border rounded-md lg:divide-x'>
             <textarea value={input} 
              onChange={(e)=>setInput(e.target.value)} 
              placeholder={(isLoading && "loading suggestion...") 
              || suggestion || 'enter a prompt'
               } 
              className='flex-1 p-4 outline-none rounded-md'/>

             <button 
             disabled={!input} type='submit' className={`
             p-4 font-bold ${input?'bg-violet-500 text-white transition-colors duration-200':'text-gray-300 cursor-not-allowed'}`}>Generate</button>

             <button type='button' onClick={()=>submitPrompt(true)} className='p-4 bg-violet-400 text-white
             transition-colors duration-200 font-bold border-none
             disabled:text-gray-300 disabled:cursor-not-allowed
             disabled:bg-gray-400'>use suggestion</button>

             <button type='button' onClick={mutate} className='p-4 text-violet-500 border-none bg-white
             transition-colors duration-200 font-bold
             disabled:text-gray-300 disabled:cursor-not-allowed
             disabled:bg-gray-400 rounded-b-md md:rounded-r-md
             md:rounded-bl-none'>new suggestion</button>
        </form>
        {
          input && (
            <p className='italic pt-2 pl-2 font-light'>
              suggestion: 
              <span className='text-violet-400'>{isLoading?"Loading...":suggestion}</span>
            </p>
          )
        }
    </div>
    
  )
}
