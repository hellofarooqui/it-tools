import React, { useEffect } from 'react'
import { useHeader } from '../../context/HeaderContext';
import SearchMain from './SearchMain';


const HeadingBar = () => {
    const {header,setHeader} = useHeader()
    useEffect(()=>{
        console.log("Header", header)
    },[header])
  return (
    <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
      <h2 className="font-bold text-2xl">{header.title}</h2>
      <SearchMain/>
    </div>
  );
}

export default HeadingBar