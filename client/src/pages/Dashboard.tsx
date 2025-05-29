import React, { useEffect, useState } from 'react'
import useDashboard from '../hooks/useDashboard'

interface Dashboard{
  activeTickets : number,
  activeRMA : number, 
  deviceCount : number
}

const defaultDashboard : Dashboard = {
  activeTickets:0,
  activeRMA:0,
  deviceCount:0
}

const Dashboard = () => {
  const [dashboard,setDashboard] = useState<Dashboard>(defaultDashboard)

  const { getActiveTickets, getActiveRMA, getDeviceCount } = useDashboard()

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const tickets = await getActiveTickets()
        if(tickets){
          setDashboard({...dashboard, activeTickets: tickets.length})
        }
        const rmas = await getActiveRMA()
        if(rmas){
          setDashboard({...dashboard, activeRMA: rmas.length})
        }
        const devices = await getDeviceCount()
        if(devices){
          setDashboard({...dashboard, deviceCount: devices.length})
        }
      }
      catch(error){

      }
    }
    fetchData()
  },[])
  return (
    <div className='p-8'>
      <div className='grid grid-cols-3 gap-x-4'>
        <div className='p-8 rounded-md border bg-white'>
          <p>Active Tickets</p>
          <p>{dashboard.activeTickets}</p>
        </div>
        <div className='p-8 rounded-md border bg-white'>
          <p>Active RMA</p>
          <p>{dashboard.activeRMA}</p>
        </div>
        <div className='p-8 rounded-md border bg-white'>
          <p>Devices</p>
          <p>{dashboard.deviceCount}</p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard