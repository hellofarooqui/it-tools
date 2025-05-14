import React from 'react'
import {deviceData} from './../data/dummydata.js'
import DeviceCard from '../components/custom/DeviceCard.js'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from '../components/ui/button'


const Devices = () => {
  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className='font-bold text-2xl'>Devices</h2>
            <Button>Create New</Button>
        </div>
        
        {/* Add your device management components here */}

        <Table>
            <TableHeader>
                <TableRow className="bg-gray-800 hover:bg-gray-700">
                    <TableHead className="text-white">Device Name</TableHead>
                    <TableHead className="text-white">Serial Number</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {deviceData.map((device) => (
                    <TableRow key={device._id}>
                        <TableCell className="text-gray-700">{device.deviceName}</TableCell>
                        <TableCell className="text-gray-700">{device.deviceSerialNumber}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    </div>
  )
}

export default Devices