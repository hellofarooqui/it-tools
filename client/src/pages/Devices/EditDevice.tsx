import React, { use, useEffect, useState } from 'react'

import { Form, useLocation, useNavigate, useParams } from 'react-router-dom'

import useDevices from '../../hooks/useDevices'
import { Button } from '../../components/ui/button'
import { useHeader } from '../../context/HeaderContext'


const EditDevice = () => {
    const {header,setHeader} = useHeader()
    const [loading, setLoading] = React.useState(true)  
    const [error, setError] = React.useState("")
    const [device, setDevice] = React.useState(null)
    const [deviceStatus,setDeviceStatus]=useState([])

    const [imageUpdated,setImageUpdated] = React.useState(false)    

    const [imagePreview, setImagePreview] = React.useState("")

    const { getDeviceDetails,updateDevice } = useDevices()
    const params = useParams()
    const deviceId = params.deviceId
    //console.log("deviceId", deviceId)
    const navigate = useNavigate()

    useEffect(()=>{
        setHeader({...header, title: "Update Device"})
    },[])
      useEffect(() => {
        const fetchDevice = async () => {
            try{
                const response = await getDeviceDetails(deviceId)
                if (response) {
                    //console.log(response.data)
                    setDevice(response.data)
                    setDeviceStatus(response.deviceStatusEnums);
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
      <div className="p-6">
        <div className="bg-white px-4 py-8 rounded-lg shadow-md w-[720px]">
          <form
            onSubmit={handleUpdateDeviceSubmit}
            className="grid grid-cols-[150px_auto] gap-x-4 gap-y-4"
          >
            <label
              className="font-semibold text-slate-700"
              htmlFor="deviceName"
            >
              Name
            </label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              placeholder="Enter device name"
              required
              value={device.deviceName}
              onChange={(e) =>
                setDevice({ ...device, deviceName: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />

            <label
              className="font-semibold text-slate-700"
              htmlFor="deviceSerialNumber"
            >
              Serial Number
            </label>
            <input
              type="text"
              id="deviceSerialNumber"
              name="deviceSerialNumber"
              placeholder="Enter device serial number"
              required
              value={device.deviceSerialNumber}
              onChange={(e) =>
                setDevice({ ...device, deviceSerialNumber: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />

            <label className="font-semibold text-slate-700" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Enter notes"
              value={device.notes}
              onChange={(e) => setDevice({ ...device, notes: e.target.value })}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 resize-none"
              rows={4}
            />

            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={device.status}
              name="status"
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
              onChange={(e) => setDevice({ ...device, status: e.target.value })}
            >
              {deviceStatus.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {device.status == "ASSIGNED" && <label>Assigned to</label>}
            {device.status == "ASSIGNED" && (
              <div>
                <input
                  list="assignees"
                  id="assignedTo"
                  className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
                  onChange={(e)=>setDevice({...device, assignedTo: e.target.value})}
                />
                <datalist id="assignees" className='w-full'>
                  <option value="Person 1" />
                  <option value="Person 2" />
                  <option value="Person 3" />
                  <option value="Person 4" />
                </datalist>
              </div>
            )}

            <label className="font-semibold text-slate-700" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="deviceImage"
              accept="image/*"
              onChange={handleFileInputChange}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-16 border rounded-md p-2 object-contain"
              />
            )}

            <div className="col-span-2 flex justify-end gap-x-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" className=" self-end px-8">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
}                                                                                       
  

export default EditDevice