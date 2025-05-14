import React from 'react'
import { Button } from '../components/ui/button'


import {rmaData} from '../data/dummydata.js'
import RMACard from '../components/custom/RMACard.js'


const RMA = () => {
  return (
    <div>
        <div className="flex justify-between items-center">
            <h2 className='font-bold text-2xl'>RMA</h2>
            <Button>Create New</Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {rmaData.map((rma) => (<RMACard rma={rma} />))}
        </div>

    </div>
  )
}

export default RMA