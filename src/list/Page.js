"use client"
import Link from "next/link"
import { useEffect, useContext, useState } from "react"
import { FaTrashCan } from "react-icons/fa6";
import { LuArrowUpAZ, LuArrowDownAZ } from "react-icons/lu";
import SiteContext from "@/context/SiteContext"
import { RxDragHandleHorizontal } from "react-icons/rx";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from "next/image";
import { PiArrowSquareDownFill,PiArrowSquareUpFill } from "react-icons/pi";

const Page = () => {
  const { search, setSearch, simpsData, setSimpsData, sorting, setSorting, sort, setSort, simpsonsFetchRefresh } = useContext(SiteContext)
  const [dragListItem, setDragListItem] = useState(null)


  const simpsonsFetch = async () => {
    try {
      const url = 'https://5fc9346b2af77700165ae514.mockapi.io/simpsons';
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network hatası');
      }
      const data = await response.json()
      setSimpsData(data)
      localStorage.setItem('simpsData', JSON.stringify(data))
      console.log("Fetch data:", data);
      console.log("LocalStorage", localStorage.getItem("simpsData"));
    } catch (error) {
      console.error(`Fetch işlemi sırasında bir sorun oluştu${error}`)
    }
  }


  useEffect(() => {
    const storedData = localStorage.getItem('simpsData')
    console.log("LocalStorage on load:", storedData)
    if (storedData) {
      setSimpsData(JSON.parse(storedData))
    } else {
      simpsonsFetch()
    }
  }, [])

  const handleSort = (key) => {
    setSorting((pre) => {
      const newOrder = pre.order === "asc" ? "desc" : "asc";
      setSort(!sort)
      return { key, order: newOrder }
    })
  }


  const filteredData = simpsData.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
    if (sorting.order === "asc") {
      return a[sorting.key].localeCompare(b[sorting.key])
    } else if (sorting.order === "desc") {
      return b[sorting.key].localeCompare(a[sorting.key])
    }
  })

  const handleDeleteUser = (id) => {
    const deleteUser = simpsData.filter((user) => user.id !== id)
    setSimpsData(deleteUser)
    localStorage.setItem('simpsData', JSON.stringify(deleteUser))
  }

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
     console.log(result)
    const items = Array.from(simpsData)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
     setSimpsData(items)
     localStorage.setItem('simpsData', JSON.stringify(items))
  }

  const handleMoveUp = (index) => {
    console.log("Moving up:", index)
    if(index > 0){ 
    const newList = [...simpsData]
    const temp = newList[index]
    newList[index] = newList[index - 1]
    newList[index - 1] = temp
    setSimpsData(newList)
    localStorage.setItem('simpsData', JSON.stringify(newList))
  }
}
  const handleMoveDown = (index) => {
    console.log("Moving down:", index)
    if(index < simpsData.length - 1){
      const newList = [...simpsData]
      const temp = newList[index]
      newList[index] = newList[index + 1]
      newList[index + 1] = temp
      setSimpsData(newList)
      localStorage.setItem('simpsData', JSON.stringify(newList))
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-x-hidden bg-purple-950">

      <Link href="/">
        <button className="absolute top-9 left-8 text-blue-800 text-xl font-bold">🏚️ Sweet Home</button>
      </Link>
      <Link href="/record">
        <button className="absolute top-8 right-8 sm:absolute sm:top-8 sm:right-8 border border-blue-900 rounded-3xl p-1 sm:p-2 text-white ml-5 text-xl font-bold">✨ Add</button>
      </Link>

      <div className="h-auto w-screen absolute top-20 gap-y-0 flex flex-col">
        <div className="mt-2 flex justify-center">
          <input
            className="h-10 rounded-lg w-64 text-xl border pl-8"
            placeholder="Tabloda Ara"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="mb-0 flex">
            <button
              onClick={() => handleSort("name")}
              className="text-white text-lg rounded-lg border bg-gray-500 ml-5 flex items-center justify-center h-10 w-20 sm:h-10 sm:w-24"
            >
              {sort ? (
                <LuArrowUpAZ size={25} />
              ) : (
                <LuArrowDownAZ size={25} />
              )}
            </button>
            <button onClick={() => simpsonsFetchRefresh()} className="text-white text-lg rounded-lg border bg-gray-500 ml-5 flex items-center justify-center h-10 w-20 sm:h-10 sm:w-28">Refresh</button>
          </div>
        </div>
   
            <ul className="simpsData" >
            {filteredData.map(({name,avatar,id},index) => (
             
              <div className={`flex relative pl-5 p-6 sm:pl-10 sm:p-8 items-center gap-x-7 sm:gap-x-10 mb-0 border-t-0 border-l-0 border-r-0 border ${
                dragListItem === index ? "opacity-50" : ""
               }`}  >
               <span className="text-white text-2xl font-semibold sm:text-3xl sm:font-bold">{index + 1}.</span>

                <Image src={avatar} alt={`${name} görseli`} width={140} height={140} className="w-12 h-14 sm:w-20 sm:h-28 " />
                <Link href={`/${id}`} className="">
                  <li className=" text-white text-xl font-medium sm:text-2xl sm:font-semibold ">{name}</li>
                </Link>

                <div className="absolute flex right-14 top-12">
                   {/* <button onClick={() => handleMoveUp(index)} disabled={index === 0}><PiArrowSquareUpFill size={35} color="grey" className="mr-1 mt-1" /></button>
                   <button onClick={() => handleMoveDown(index)} disabled={index === filteredData.length - 1}><PiArrowSquareDownFill size={35} color="grey" className="mr-5 mt-1" /></button> */}
                   <button onClick={() => handleDeleteUser(id)}><FaTrashCan color="white" className="w-5 h-7 sm:w-6 sm:h-10 " /></button>
                   <button className="ml-5"><RxDragHandleHorizontal color="grey" className="w-7 h-7 sm:w-8 sm:h-10 " /></button>
                </div>
              </div>
              
            
            ))}
            
            </ul>
         

      </div>
    </div>
  )
}
export default Page
