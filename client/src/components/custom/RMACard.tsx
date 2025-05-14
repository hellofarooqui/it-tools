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
    <Card>
        <CardHeader>
            <CardTitle className="text-lg font-bold">{rma.rmaNumber}</CardTitle>
            <Badge className={`${rma.rma_status === 'New' ? "bg-indigo-500": rma.rma_status === "Pending" ? "bg-yellow-500" : rma.rma_status === "Approved" ? "bg-green-500" : "bg-red-500"}`}>{rma.rma_status}</Badge>
        </CardHeader>
        <CardContent>
            <p className='text-slate-600 text-sm'><span className='font-semibold'>Device: </span>{rma.deviceName}</p>
            <p className='text-slate-600 text-sm'><span className='font-semibold'>Serial Number: </span> {rma.deviceSerialNumber}</p>
        </CardContent>
        <CardFooter>

        </CardFooter>
    </Card>
  )
}

export default RMACard