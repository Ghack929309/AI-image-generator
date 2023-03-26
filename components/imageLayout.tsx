"use client"
import fetchImages from "@/lib/fetchImages";
import Image from "next/image"
import useSWR from 'swr';

type ImageURL={
    url:string;
    name:string;
}

export default function ImageLayout() {
    const {data:images,isLoading,
        mutate:refreshImages,isValidating}=useSWR('/api/getImages',fetchImages,{
            revalidateOnFocus:false
        })
        
        
  return (
    <div className="">
        {/* let's pass the old images to have a nice refresh */}
        <button onClick={()=>refreshImages(images)}
        className="fixed bottom-10 right-10 bg-violet-400/90
        text-white px-5 py-3 rounded-md z-20 hover:bg-violet-500
        focus:outline-none focus:ring-2 focus:ring-violet-400
        font-bold"
        >
            {
                !refreshImages && isValidating ? 'Refreshing...':'Refresh images'
            }
        </button>
        {
            isLoading && (
                <p className="text-xl text-center animate-pulse
                pb-7 font-extralight">Loading
                 <span className="text-violet-400 px-1">AI</span> Generating images...
                </p>
            )
        }
        <div className="grid gap-4 grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
         2xl:grid-cols-5 px-0 md:px-10">
    { images?.imageUrls?.map((image:ImageURL,idx:number)=>(
                <div className={`relative cursor-help
                ${idx ===0 &&'md:col-span-2 md:row-span-2'}
                hover:scale-[103%] transition-transform
                duration-200 ease-in-out`} key={image.name}>
                    <div className="absolute flex justify-center items-center
                    w-full h-full bg-white opacity-0 hover:opacity-80
                    transition-opacity duration-200 z-10">
                        <p className="text-center text-light text-lg p-5">
                            {/* getting the name by removing the timestamp and the extension */}
                            {
                                image.name.split('_').shift()?.toString().split('.').shift()
                            }
                        </p>
                    </div>
                    <Image 
                    src={image.url} 
                    alt={image.name}
                    width={800}
                    height={800}
                    className="w-full rounded-sm shadow-2xl drop-shadow-lg
                    -z-10"
                    />
                </div>
            ))
    }
        </div>
    </div>
  )
}
