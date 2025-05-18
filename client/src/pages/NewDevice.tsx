import React from 'react'
import useDevices from '../hooks/useDevices'
import { Form, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

const defaultDevice = {
  deviceName: "",
  deviceSerialNumber: "",
  notes: "",
  image: "",
  addedOn: new Date().toISOString(),
}

const NewDevice = () => {

    const [device, setDevice] = React.useState(defaultDevice)
    const [imagePreview, setImagePreview] = React.useState("")

    const { addDevice } = useDevices()
    const navigate = useNavigate()
    const handleDeviceFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addDevice(device)
            console.log(response)
            if (response) {
                setDevice(defaultDevice)
                navigate(-1)
            }
        } catch (error) {
            console.error("Error creating device:", error)
        }
    }

    const handleFileInputChange = (e) => {
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

    const handleAddDeviceSubmit = async (e) => {
        e.preventDefault()
        try {
            const submitData = new FormData()
            for(const key in device) {
                submitData.append(key, device[key])
            }
            const response = await addDevice(submitData)
            console.log(response)
            if (response) {
                setDevice(defaultDevice)
                navigate(-1)
            }
        } catch (error) {
            console.error("Error creating device:", error)
        }
    }




    return (
        <div>
            <div>
                <h2 className='font-bold text-slate-800 text-2xl'>Add New Device</h2>
            </div>

            <div className='bg-white px-4 py-8 rounded-lg mt-4 shadow-md w-[720px]'>
                <form onSubmit={handleAddDeviceSubmit} className='flex flex-col gap-y-4'>
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
  

export default NewDevice