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
  }
  return (
    <SiteContext.Provider value={data}>
        {children}
    </SiteContext.Provider>
  )
}
export default Provider