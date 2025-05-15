import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'


interface RMACardProps {
        _id: String,
        rmaNumber:String,
        deviceName: String,
        deviceSerialNumber:String,
        rma_status: String,
        reason: String,
        requestedOn: Date
}

const RMACard = ({rma}:{rma:RMACardProps}) => {
  return (
    <Link to={rma._id}>
    <Card className="gap-2">
        <CardHeader>
            <CardTitle className="text-lg font-bold bg-slate-200  p-2 mb-2 rounded-md">{rma.rmaNumber}</CardTitle>
            <Badge className={`${rma.rma_status === 'New' ? "bg-indigo-500": rma.rma_status === "Pending" ? "bg-yellow-500" : rma.rma_status === "Approved" ? "bg-green-500" : "bg-red-500"}`}>{rma.rma_status}</Badge>
        </CardHeader>
        <CardContent>
          <p>{rma.reason}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
        <p className='text-slate-600 text-sm'><span className='font-semibold'>Device: </span>{rma.deviceName}</p>
            <p className='text-slate-600 text-sm'><span className='font-semibold'>Serial Number: </span> {rma.deviceSerialNumber}</p>

        </CardFooter>
    </Card>
    </Link>
  )
}

export default RMACard