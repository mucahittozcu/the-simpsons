"use client"
import Link from "next/link"
import { useEffect,useContext, useRef, useState } from "react"
import { FaTrashCan } from "react-icons/fa6";
import { LuArrowUpAZ,LuArrowDownAZ } from "react-icons/lu";
import SiteContext from "@/context/SiteContext"
import { RxDragHandleHorizontal } from "react-icons/rx";
// import { PiArrowSquareUpFill } from "react-icons/pi";
// import { PiArrowSquareDownFill } from "react-icons/pi";
 {/* <button onClick={() => handleMoveUpUser(index)} className=""><PiArrowSquareUpFill size={35} color="grey" /></button>
<button onClick={() => handleMoveDownUser(index)} className="mr-2"><PiArrowSquareDownFill size={35} color="grey" /></button> */}

const Page = () => {
 const {search,setSearch,simpsData,setSimpsData,sorting,setSorting,sort,setSort} = useContext(SiteContext)
 const [dragListItem,setDragListItem] = useState(null) 
 const [dragOverListItem,setDragOverListItem] = useState(null) 


  const simpsonsFetch = async () => {
     try{
        const response = await fetch(`https://5fc9346b2af77700165ae514.mockapi.io/simpsons`) 
        const data = await response.json()
        setSimpsData(data)
        localStorage.setItem('simpsData', JSON.stringify(data))
        console.log(data);
     }
     catch(error){
      console.error(`Fetch işlemi sırasında bir sorun oluştu${error}`)
     }
  }

  useEffect(() => {
    const storedData = localStorage.getItem('simpsData')
    if (storedData) {
      setSimpsData(JSON.parse(storedData))
    } else {
      simpsonsFetch()
    }
  }, [setSimpsData])

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

    function handleDeleteUser(id) {
      const deleteUser = simpsData.filter((user) => {
        return user.id !== id
    })
    setSimpsData(deleteUser)
    localStorage.setItem('simpsData', JSON.stringify(deleteUser)) // bir öğeyi silmemiz durumunda localStorage'i güncelliyoruz
   }

   const handleDragStart = (index) => {
     setDragListItem(index)
   } 
   const handleDragEnter = (index) => {
    setDragOverListItem(index)
   }
   const handleDrop = () => {
     const listClone = [...simpsData]
     const dragList = listClone[dragListItem]
     listClone.splice(dragListItem,1)
     listClone.splice(dragOverListItem, 0, dragList)
     setSimpsData(listClone)
     localStorage.setItem('simpsData', JSON.stringify(listClone))

   }

   const handleDragEnd = () => {
    setDragListItem(null)
    setDragOverListItem(null)
  }

  return (
    <div className="relative h-screen w-screen overflow-x-hidden bg-purple-950">

       <Link href="/">
          <button className="absolute top-9 left-8 text-blue-800 text-xl font-bold">🏚️ Sweet Home</button>
       </Link>
       <Link href="/record">
           <button className="absolute top-8 right-8 sm:absolute sm:top-7 sm:right-8 border border-blue-900 rounded-3xl p-1 sm:p-2 text-white ml-5  text-xl font-bold">✨ Add</button>
       </Link>

      <div className=" h-auto w-screen absolute top-20 gap-y-0 flex flex-col">

      <div className="mt-2 flex">
         <div className="mb-0">
           <button
            onClick={() => handleSort("name")}
            className="text-white text-lg rounded-lg border border-blue-900 ml-10 flex items-center justify-center h-10 w-24 sm:h-10 sm:w-28"
            >
            {sort ? (
              <LuArrowUpAZ size={25} />
            ) : (
              <LuArrowDownAZ size={25} />
            )}
          </button>
        </div>
          {/* <pre>{JSON.stringify(sorting,null,2)}</pre> */}
             <input 
              className="h-10 w-screen rounded-lg text-xl mr-10 ml-5 border pl-8" 
              placeholder="Tabloda Ara" 
              type="text" 
              value={search} 
              onChange={(event) => setSearch(event.target.value)} 
             />
      </div>
        
         {filteredData.map((data,index) => (
           <ol key={data.id} className={`flex relative pl-5 p-6 sm:pl-10 sm:p-8 items-center gap-x-7 sm:gap-x-10 mb-0 border-t-0 border-l-0 border-r-0 border ${
            dragListItem === index ? "opacity-50" : ""
          }`}
             draggable
             onDragStart={() => handleDragStart(index)}
             onDragOver={(e) => e.preventDefault()}
             onDrop={() => handleDrop(index)}
             onDragEnter={() => handleDragEnter(index)} 
             onDragEnd={handleDragEnd} 
            >
               <span className="text-white text-2xl font-semibold sm:text-3xl sm:font-bold">{index + 1}.</span>
                <img src={data.avatar} alt={`${data.name} görseli`} className="w-12 h-14 sm:w-14 sm:h-16 " />

                <Link href={`/${data.id}`} className="">
                  <li className=" text-white text-xl font-medium sm:text-2xl sm:font-semibold ">{data.name}</li>
                </Link>

                <div className="absolute right-14 top-12">
                   <button onClick={() => handleDeleteUser(data.id)}><FaTrashCan color="white" className="w-5 h-7 sm:w-6 sm:h-10 " /></button>
                   <button className="ml-5"><RxDragHandleHorizontal color="grey" className="w-7 h-7 sm:w-8 sm:h-10 " /></button>
                </div>
           </ol>
         ))}
      </div>

    </div>
  )
}
export default Page


//////////////////////////////////////////////////////////////////////////////


//    const handleDragStart = (index) => {
//      dragListItem.current = index
//    } 
//    const handleDragEnter = (index) => {
//      dragOverListItem.current = index
//    }
//    const handleDrop = () => {
//     const listClone = [...simpsData]
//     const itemDragg = listClone[dragListItem.current]
//     listClone.splice(dragListItem.current, 1)
//     listClone.splice(dragOverListItem.current, 0, itemDragg)
//     dragListItem.current = null
//     dragOverListItem.current = null
//     setSimpsData(listClone)
//   localStorage.setItem('simpsData', JSON.stringify(listClone))
     
//     }
    
//     const handleDragEnd = () => {
//       const listClone = [...simpsData]
//       const itemDragg = listClone[dragListItem.current]
//       listClone.splice(dragListItem.current, 1)
//       listClone.splice(dragOverListItem.current, 0, itemDragg)
//       dragListItem.current = null
//       dragOverListItem.current = null
//       setSimpsData(listClone)
//     localStorage.setItem('simpsData', JSON.stringify(listClone))

//     }

//          {filteredData.map((data,index) => (
//            <ol key={data.id} className={`flex relative pl-5 p-6 sm:pl-10 sm:p-8 items-center gap-x-7 sm:gap-x-10 mb-0 border-t-0 border-l-0 border-r-0 border ${
//             dragListItem === index ? "opacity-50" : ""
//           }`}
//              draggable
//              onDragStart={() => handleDragStart(index)}
//              onDragEnter={() => handleDragEnter(index)}
//              onDragEnd={handleDragEnd} 
//              onDragOver={(e) => e.preventDefault()}
//             //  onDrop={handleDrop}
//             >
