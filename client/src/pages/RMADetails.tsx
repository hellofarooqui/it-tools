import React from 'react'
import { Button } from '../components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

const RMADetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const rma = location.state.rma
    console.log(rma)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [rmaDetails, setRmaDetails] = React.useState(rma)
  return (
    <div>
        <div className='w-full flex justify-between items-center'>
            <h2 className='font-bold text-2xl'>{rma.rmaNumber}</h2>
            <Button onClick={()=>navigate('edit')} className='px-8'>Edit</Button>
        </div>

        <div>
            <div className='flex flex-col gap-y-4 mt-4 border border-slate-200 bg-white px-4 py-8 rounded-lg shadow-md w-[720px]'>
                
                <div className='flex w-full gap-x-4 items-center'>
                    <label className='font-semibold text-slate-700' htmlFor="deviceName">Device Name :</label>
                    <p className='text-slate-600'>{rma.deviceName}</p>
                </div>
                <div className='flex w-full gap-x-4 items-center'>
                    <label className='font-semibold text-slate-700' htmlFor="deviceSerialNumber">Device Serial Number :</label>
                    <p className='text-slate-600'>{rma.deviceSerialNumber}</p>
                </div>
                <div className='flex w-full gap-x-4 items-center'>
                    <label className='font-semibold text-slate-700' htmlFor="status">Status :</label>
                    <p className={`text-slate-100 ${rma.status === 'New' ? "bg-indigo-500" : rma.status === "Pending" ? "bg-yellow-500" : rma.status === "Approved" ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded-md`}>{rma.status}</p>
                </div>
                <div className='flex w-full gap-x-4 items-center'>
                    <label className='font-semibold text-slate-700' htmlFor="reason">Reason :</label>
                    <p className='text-slate-600'>{rma.reason}</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default RMADetails