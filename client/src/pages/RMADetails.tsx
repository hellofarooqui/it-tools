import React from 'react'
import { Button } from '../components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import useRMA from '../hooks/useRMA'

const RMADetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const rma = location.state.rma
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(true)

    const { deleteRMA } = useRMA()

    const handleDelete = async () => {
        try {
            const response = await deleteRMA(rma._id)
            if (response) {
                setLoading(false)
                setError(null)

                window.history.back()
            } else {
                console.error("Error deleting RMA")
                setError("Error deleting RMA")
            }
        } catch (error) {
            console.error("Error deleting RMA", error)
            setError("Error deleting RMA")
        }
    }

    if (error) {
        setTimeout(() => {
            window.history.back()
        }, 3000)
        return (
            <div className='flex justify-center items-center h-screen'>
                <h2 className='font-bold text-2xl'>Error: {error}</h2>
            </div>
        )
    }
    return (
        <div>
            <div className='w-full flex justify-between items-center'>
                <h2 className='font-bold text-2xl'>{rma.rmaNumber}</h2>
                <div className='flex gap-x-4'>
                    
                    <Button variant="outline" onClick={() => navigate(`edit`)} className='px-8'>Edit</Button>
                    <Button onClick={handleDelete} className='px-8'>Delete</Button>
                </div>
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