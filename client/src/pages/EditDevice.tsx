import React, { use, useEffect } from 'react'
import useDevices from '../hooks/useDevices'
import { Form, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'


const EditDevice = () => {

    const [loading, setLoading] = React.useState(true)  
    const [error, setError] = React.useState("")
    const [device, setDevice] = React.useState(null)

    const [imageUpdated,setImageUpdated] = React.useState(false)    

    const [imagePreview, setImagePreview] = React.useState("")

    const { getDeviceDetails,updateDevice } = useDevices()
    const params = useParams()
    const deviceId = params.deviceId
    console.log("deviceId", deviceId)
    const navigate = useNavigate()

      useEffect(() => {
        const fetchDevice = async () => {
            try{
                const response = await getDeviceDetails(deviceId)
                if (response) {
                    console.log(response)
                    setDevice(response)
                    setLoading(false)
                    setError("")
                } else {
                    console.error("Error fetching device details")
                    setError("Error fetching device details")
                }   
            }
            catch (error) {
                console.error("Error fetching device details", error)
                setError("Error fetching device details")
            }
        }
        fetchDevice()
    }, [deviceId])



    const handleFileInputChange = (e) => {
        setImageUpdated(true)
        const file = e.target.files[0]
        if (file) {
            setDevice({ ...device, deviceImage: file })
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdateDeviceSubmit = async (e) => {
        e.preventDefault()

        if(imageUpdated){
            const submitData = new FormData()
            for(const key in device) {
                submitData.append(key, device[key])
            }
            console.log("submitData",submitData)
            try {
                const response = await updateDevice(device._id,submitData)
                console.log(response)
                if (response) {
                    //setDevice(defaultDevice)
                    navigate(-1)
                    return
                }
            } catch (error) {
                console.error("Error creating device:", error)
            }
        }

        try {
            console.log("data",device)
          
            const response = await updateDevice(device._id,device)
            console.log(response)
            if (response) {
                //setDevice(defaultDevice)
                navigate(-1)
            }
        } catch (error) {
            console.error("Error creating device:", error)
        }
    }


    if(loading) {  
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1 className='text-2xl font-bold text-slate-800'>Loading...</h1>
            </div>
        )
    }
    if(error) {
        <div>
            <h1 className='text-2xl font-bold text-slate-800'>Error: {error}</h1>   
        </div>
    }

    return (
        <div>
            <div>
                <h2 className='font-bold text-slate-800 text-2xl'>Add New Device</h2>
            </div>

            <div className='bg-white px-4 py-8 rounded-lg mt-4 shadow-md w-[720px]'>
                <form onSubmit={handleUpdateDeviceSubmit} className='flex flex-col gap-y-4'>
                    <div className='flex w-full gap-x-4 items-center'>
                        <label className='font-semibold text-slate-700' htmlFor="deviceName">Device Name</label>
                        <input
                            type="text"
                            id="deviceName"
                            name="deviceName"
                            placeholder="Enter device name"
                            required
                            value={device.deviceName}
                            onChange={(e) => setDevice({ ...device, deviceName: e.target.value })}
                            className='flex-1 border border-slate-300 rounded-sm px-2 py-1'
                        />
                    </div>
                    <div className='flex w-full gap-x-4 items-center'>
                        <label className='font-semibold text-slate-700' htmlFor="deviceSerialNumber">Device Serial Number</label>
                        <input
                            type="text"
                            id="deviceSerialNumber"
                            name="deviceSerialNumber"
                            placeholder="Enter device serial number"
                            required
                            value={device.deviceSerialNumber}
                            onChange={(e) => setDevice({ ...device, deviceSerialNumber: e.target.value })}
                            className='flex-1 border border-slate-300 rounded-sm px-2 py-1'
                        />
                    </div>
                    <div className='flex w-full gap-x-4 items-start'>
                        <label className='font-semibold text-slate-700' htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            placeholder="Enter notes"
                            value={device.notes}
                            onChange={(e) => setDevice({ ...device, notes: e.target.value })}
                            className='flex-1 border border-slate-300 rounded-sm px-2 py-1 resize-none'
                            rows={4}
                        />
                    </div>
                    <div className='flex w-full gap-x-4 items-center'>
                        <label className='font-semibold text-slate-700' htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="deviceImage"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            className='flex-1 border border-slate-300 rounded-sm px-2 py-1'
                        />
                        {imagePreview && <img src={imagePreview} alt="Preview" className='mt-2 w-32 h-16 border rounded-md p-2 object-contain' />}
                    </div>
                    <Button type='submit' className=' self-end px-8'>Save</Button>
                </form>
            </div>
        </div>
    )
}                                                                                       
  

export default EditDevice