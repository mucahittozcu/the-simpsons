"use client"
import Link from "next/link"
import { useContext,useEffect } from "react"
import SiteContext from "@/context/SiteContext"


const page = () => {
const {name,setName,job,setJob,herHim,setHerHim,image,setImage,setSimpsData,simpsData} = useContext(SiteContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      id: crypto.randomUUID(),
      name: name,
      job: job,
      herHim: herHim,
      image: image,
    }
    setSimpsData((pre) => {
      const updatedData = [...pre, newUser]
      localStorage.setItem('simpsData', JSON.stringify(updatedData)) // Güncel veriyi localStorage'ye kaydediyoruz
      return updatedData
    })

    setName("")
    setJob("")
    setHerHim("")
    setImage("")
    window.location.href = "/"
  }

  useEffect(() => {
    const storedData = localStorage.getItem('simpsData') // verileri localStorage'den okuyup [simpsData]'yı güncelliyoruz
    if (storedData) {
      setSimpsData(JSON.parse(storedData) || simpsData)
    }
  },[setSimpsData])

  return (
    <div className="bg-purple-950 relative w-screen h-screen overflow-hidden">

       <Link href="/">
           <button className="absolute top-8 left-5 text-white ml-5  text-xl font-bold">👈 Go Back</button>
       </Link>
       <Link href="/record">
           <button className="absolute top-9 right-8 border border-blue-900 rounded-3xl p-2 text-white ml-5  text-xl font-bold">✨ Add</button>
       </Link>
    <div className="flex justify-center items-center pt-32 ">
        
        <div className="flex flex-col gap-y-6 pb-4 sm:pb-0 sm:gap-y-8 ml-14 text-white">
           <label htmlFor="name" className="text-lg font-medium sm:text-xl sm:font-semibold" >Name Surname:</label>
           <label htmlFor="job" className="text-lg font-medium sm:text-xl sm:font-semibold" >Job Title:</label>
           <label htmlFor="her" className="text-lg font-medium sm:text-xl sm:font-semibold" >About Her/Him:</label>
           <label htmlFor="image" className="text-lg font-medium sm:text-xl sm:font-semibold" >Image URL:</label>
        </div>

       <form className="flex flex-col gap-y-5 mt-32 p-10 " onSubmit={handleSubmit}>
          <input 
            type="text"
            id="name"
            required
            className="w-[300px] pl-5 h-[50px] ml-4 sm:w-[400px] sm:pl-5 sm:h-[40px] sm:ml-32 border rounded-lg "
            placeholder=""
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input 
            type="text"
            id="job"
            required
            className="w-[300px] pl-5 h-[50px] ml-4 sm:w-[400px] sm:pl-5 sm:h-[40px] sm:ml-32 border rounded-lg "
            placeholder=""
            value={job}
            onChange={(event) => setJob(event.target.value)}
          />
          <input 
            type="text"
            id="her"
            className="w-[300px] pl-5 h-[50px] ml-4 sm:w-[400px] sm:pl-5 sm:h-[40px] sm:ml-32 border rounded-lg "
            placeholder=""
            value={herHim}
            onChange={(event) => setHerHim(event.target.value)}
          />
          <input 
            type="url"
            id="image"
            className="w-[300px] pl-5 h-[50px] ml-4 sm:w-[400px] sm:pl-5 sm:h-[40px] sm:ml-32 border rounded-lg "
            placeholder=""
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
             <button type="submit" className="p-3 mr-24 rounded-3xl mt-14 flex justify-center items-center text-white border border-blue-900 text-xl font-semibold ">Add</button>

       </form>

     </div>

    </div>
  )
}
export default page