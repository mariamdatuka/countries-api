import React,{ useState,useEffect, createContext} from "react"
import Search from "./components/Search/Search"
import { GlobalStyles } from "./GlobalStyles"
import { createBrowserRouter,RouterProvider, Route, createRoutesFromElements } from "react-router-dom"
import MoreInfo from "./components/MoreInfo"
import axios from "axios"
import { Data } from "./Types"

export const AppContext =createContext([]);

function App() {
  const [data,setData]=useState<Data[]>([]);
  const router=createBrowserRouter(
    createRoutesFromElements(
       <>
        <Route path='/' element={<Search />}/>
        <Route  path='/country/:id' element={<MoreInfo />}/>    
      </>
    )
  )
  //get all countries when component mounts
useEffect(()=>{
  const getAllCountries=async()=>{
   try{
   const {data}=await axios.get('https://restcountries.com/v2/all');
     setData(data);
     console.log(data);
   } catch (error){
       console.log(error);
   }
  }
  getAllCountries();
},[])

  return (
  <>
    <AppContext.Provider value={data}>
      <RouterProvider router={router}/>
      <GlobalStyles/>
    </AppContext.Provider>
  </>
  )
}

export default App
