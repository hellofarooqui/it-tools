import React, { useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Loader2 } from "lucide-react"


import {rmaData} from '../data/dummydata.js'
import RMACard from '../components/custom/RMACard.js'
import { useNavigate } from 'react-router-dom'
import { set } from 'react-hook-form'
import useRMA from '../hooks/useRMA.js'


const RMA = () => {
  const navigate = useNavigate()
  const [allRMA, setAllRMA] = React.useState([])
  const {getAllRMAs} = useRMA()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)  

  useEffect(() => {
    const fetchRMA = async () => {
      const response = await getAllRMAs()
      if(response){
        setAllRMA(response)
        setLoading(false)
        setError(null)
      }
      else null
    }
    fetchRMA()
  }, [])

  if(loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h2 className='font-bold text-2xl'><Loader2 className='animate-spin text-4xl' /></h2>
      </div>
    )
  }

  if(error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h2 className='font-bold text-2xl'>Error: {error}</h2>
      </div>
    )
  }

  return (
    <div className="p-8">
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-2xl'>RMA</h2>
            <Button onClick={()=>navigate("new")}>Create New</Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {allRMA && allRMA.map((rma) => (<RMACard key={rma._id} rma={rma} />))}
        </div>

    </div>
  )
}

export default RMA