"use client"
import { useContext, useEffect, useState } from "react";
import SiteContext from "@/context/SiteContext";
import Link from "next/link";

const Page = ({params}) => {
  const { simpsData } = useContext(SiteContext);
  const [simpsChar,setSimpsChar] = useState(null)
  const simpsonsFetch = async () => {
    try{
       const response = await fetch(`https://5fc9346b2af77700165ae514.mockapi.io/simpsons/${params.detail}`) 
       const data = await response.json()
       setSimpsChar(data)
       localStorage.setItem('simpsChar', JSON.stringify(data))
       console.log(data);
    }
    catch(error){
     console.error(`Fetch işlemi sırasında bir sorun oluştu${error}`)
    }
 }
 useEffect(() => {
    simpsonsFetch()
 },[params.detail])

 if (!simpsChar) {
    return <div className="h-screen flex justify-center items-center bg-purple-950 text-white">Yükleniyor...</div>;
  }

  console.log(simpsChar);

  return (
    <div className="relative h-screen w-screen overflow-x-hidden bg-purple-950">

      <Link href="/">
        <button className="absolute top-8 left-5 text-white ml-5 text-xl font-bold">👈 Go Back</button>
      </Link>
      <Link href="/record">
        <button className="absolute top-9 right-8 border border-blue-900 rounded-3xl p-2 text-white ml-5 text-xl font-bold">✨ Add</button>
      </Link>

      <div className="flex justify-center items-center h-screen">

        <div className="flex flex-col items-center  pt-40 p-32">
          <img src={simpsChar.avatar} alt={`${simpsChar.name} görseli`} className="w-32 h-44" />
          <h2 className="text-white text-2xl font-semibold pt-2">{simpsChar.name}</h2>
          <h4 className="text-white text-xl font-semibold pt-2">{simpsChar.job}</h4>
          <div className="w-[350px]  h-auto ">
            <p className="text-white text-base font-semibold pt-2">{simpsChar.description}</p>
          </div>
          
        </div>
      
      </div>

    </div>
  );
};

export default Page;