import React from 'react'
import { Button } from '../components/ui/button'

// rmaNumber
// deviceName
// deviceSerialNumber
// status
// reason

interface RMA {
  rmaNumber: string;
  deviceName: string;
  deviceSerialNumber: string;
  status: string;
  reason: string;
}

const defaultRMA = {
  rmaNumber: "",
  deviceName: "",
  deviceSerialNumber: "",
  status: "New",
  reason: ""
}

const NewRMA = () => {

  const [rma, setRMA] = React.useState<RMA>(defaultRMA)
  return (
    <div>
      <div>
        <h2 className='font-bold text-slate-800 text-2xl'>Add New RMA</h2>
      </div>

      <div className='bg-white px-4 py-8 rounded-lg mt-4 shadow-md w-[720px]'>
        <form className='flex flex-col gap-y-4'>
          <div className='flex w-full gap-x-4 items-center'>
            <label className='font-semibold text-slate-700' htmlFor="rmaNumber">RMA Number</label>
            <input
              type="text"
              id="rmaNumber"
              name="rmaNumber"
              placeholder="Enter RMA number"
              required
              className='flex-1 border border-slate-300 rounded-sm px-2 py-1'
            />
          </div>
          <div className='flex w-full gap-x-4 items-center'>
            <label className='font-semibold text-slate-700' htmlFor="deviceName">Device Name</label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              placeholder="Enter device name"
              required
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
               className='flex-1 border border-slate-300 rounded-sm px-2 py-1'
            />
          </div>
          <div className='flex w-full gap-x-4 items-start'>
            <label className='font-semibold text-slate-700' htmlFor='reason'>Reason</label>
            <textarea
              id='reason'
              name='reason'
              placeholder='Enter reason for RMA'
              required
               className='flex-1 border border-slate-300 rounded-sm px-2 py-1 resize-none h-32'
            ></textarea>
          </div>
          <Button className=' self-end px-8'>Save</Button>
        </form>
      </div>
    </div>
  )
}

export default NewRMA