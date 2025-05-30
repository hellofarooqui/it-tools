import React, { useEffect, useState } from 'react'
import useDashboard from '../hooks/useDashboard'
import { Loader2 , User } from 'lucide-react'
import { Button} from '../components/ui/button'

interface Dashboard{
  activeTickets : number,
  activeRMA : number, 
  deviceCount : number
}

let defaultDashboard : Dashboard = {
  activeTickets:0,
  activeRMA:0,
  deviceCount:0
}

const Dashboard = () => {
  const [dashboard,setDashboard] = useState<Dashboard>(defaultDashboard)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")

  const { getActiveTickets, getActiveRMA, getDeviceCount } = useDashboard()

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const tickets = await getActiveTickets()
        if(tickets){
          console.log("Active Tickets length", tickets.length)
          console.log("Is Array", Array.isArray(tickets))
          
          setDashboard((prev)=>({...prev, activeTickets: tickets.length}))
        }
        const rmas = await getActiveRMA()
        if(rmas){
          console.log(rmas)
          setDashboard((prev) => ({...prev, activeRMA: rmas.length}))
        }
        const devices = await getDeviceCount()
        if(devices){
          setDashboard((prev)=>({...prev, deviceCount: devices.deviceCount}))
        }
      }
      catch(error){
        setError("Something went wrong")
      }
      finally{
        console.log("Active Tickets LEngth", dashboard.activeTickets)
        setLoading(false)
      }
    }
    fetchData()
  },[])

  if(loading){
    return( <div className='w-screen h-screen flex justify-center items-center'>
      <Loader2/>
    </div>)
  }

  if(error){
    return( <div className='w-screen h-screen flex justify-center items-center'>
      <p>{error}</p>
    </div>)
  }

  return (
    <div className=''>
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => navigate("new")}
            className=""
          >
            <User/>
          </Button>
        </div>
      <div className='p-8 grid grid-cols-3 gap-x-4'>
        <div className='bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 p-8 flex flex-col gap-y-2 rounded-[10px] border'>
          <p className='text-emerald-800 text-white text-medium font-semibold'>Active Tickets</p>
          <p className='text-emerald-800 text-white text-2xl font-semibold'>{dashboard.activeTickets}</p>
        </div>
        <div className='bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 p-8 flex flex-col gap-y-2 rounded-[10px] border'>
         <p className='text-indigo-800 text-white text-medium font-semibold'>Active RMA</p>
         <p className='text-indigo-800 text-white text-2xl font-semibold'>{dashboard.activeRMA}</p>
        </div>
        <div className='bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-8 flex flex-col gap-y-2 rounded-[10px] border'>
          <p className='text-purple-800 text-white text-medium font-semibold'>Devices</p>
          <p className='text-purple-800 text-white text-2xl font-semibold'>{dashboard.deviceCount}</p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard