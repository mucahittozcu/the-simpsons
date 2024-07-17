"use client"
import SiteContext from "@/context/SiteContext"
import { useState } from "react";
const Provider = ({ children }) => {
    
  const [name,setName] = useState("")
  const [job,setJob] = useState("")
  const [herHim,setHerHim] = useState("")
  const [image,setImage] = useState()

  const [search,setSearch] = useState("")
  const [simpsData,setSimpsData] = useState([])
  const [sorting, setSorting] = useState({ key: "name", order: "asc" })
  const [sort, setSort] = useState(true)

  const simpsonsFetchRefresh = async () => {
    try{
     const url = 'https://5fc9346b2af77700165ae514.mockapi.io/simpsons';
     // const url = '/api/simpsons';
       const response = await fetch(url) 
       if (!response.ok) {
         throw new Error('Network hatası');
       }
       const data = await response.json()
       setSimpsData(data)
       localStorage.setItem('simpsData', JSON.stringify(data))
       console.log(data);
    }
    catch(error){
     console.error(`Fetch işlemi sırasında bir sorun oluştu${error}`)
    }
 }

  const data = {
    name,
    setName,
    job,
    setJob,
    herHim,
    setHerHim,
    image,
    setImage,
    search,
    setSearch,
    simpsData,
    setSimpsData,
    sorting,
    setSorting,
    sort, 
    setSort,
    simpsonsFetchRefresh
  }
  return (
    <SiteContext.Provider value={data}>
        {children}
    </SiteContext.Provider>
  )
}
export default Provider