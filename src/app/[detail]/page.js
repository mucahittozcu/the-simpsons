"use client"
import { useContext, useEffect, useState } from "react";
import SiteContext from "@/context/SiteContext";
import Link from "next/link";
import Image from "next/image";

const Page = ({ params }) => {
  const { simpsData } = useContext(SiteContext);
  const [simpsChar,setSimpsChar] = useState(null)
  

 useEffect(() => {
    const char = simpsData.find(item => item.id === params.detail)
    setSimpsChar(char)
 },[simpsData,params.detail])

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
          <Image src={simpsChar.avatar} width={200} height={200} alt={`${simpsChar.name} görseli`} className="w-40 h-64" />
          <h2 className="text-white text-2xl font-semibold pt-2">{simpsChar.name}</h2>
          <h4 className="text-white text-xl font-semibold pt-2">{simpsChar.job}</h4>
          <div className="w-[350px]  h-auto ">
            <p className="text-white text-base font-semibold pt-2">{simpsChar.description}</p>
          </div>
          <Link href={"/"}>
            <button className="text-xl mt-5 font-semibold text-white bg-gray-500 rounded-lg border p-2">Back to list</button>
          </Link>
        </div>
      
      </div>

    </div>
  );
};

export default Page;