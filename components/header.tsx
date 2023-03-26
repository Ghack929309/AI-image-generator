import Image from "next/image"
import Link from "next/link"
function Header() {
  return (
   <header className="flex p-5 justify-between sticky top-0 bg-white
   z-50 shadow-md ">
        <div className="flex space-x-2 items-center">
            <Image width={30} height={30} alt="logo" src='https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png' />
            <div className="">
            <h1 className="font-bold">Image-<span className="text-violet-500">generator</span></h1>
            <h2 className="text-xs">Powered by Dall.e</h2>
            
            </div>
           
        </div>
        <div className="flex text-xs md:text-base divide-x 
        items-center text-gray-500">
            <Link className="px-2 text-right font-light" href='https://www.linkedin.com/in/jonathan-junior-calixte/'>
            Follow me on linkedin
            </Link>
            <Link className="px-2 text-right font-light" href='https://github.com/Ghack929309'>Github repo</Link>
        </div>
   </header>
  )
}

export default Header