import React from 'react'
import axios from 'axios'


interface Device {
    deviceName: string
    deviceSerialNumber: string,
    notes: string,
    image: string,
    addedOn: string,
}

const useDevices = () => {

    const serverUrl = import.meta.env.VITE_SERVER_URL
    const apiUrl = `${serverUrl}/api/devices`

    const addDevice = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/new`, data)
            if(response.status !== 201) {
                throw new Error('Failed to create device')
            }
            return response.data
        } catch (error) {
            console.error('Error creating device:', error)
            throw error
        }
    } 

    const getAllDevices = async () => {
        try {
            const response = await axios.get(apiUrl)
            if(response.status !== 200) {
                throw new Error('Failed to fetch devices')
            }
            return response.data
        } catch (error) {
            console.error('Error fetching devices:', error)
            throw error
        }
    }

    const getDeviceDetails = async (deviceId) => {
        try {
            const response = await axios.get(`${apiUrl}/${deviceId}`)
            if(response.status !== 200) {
                throw new Error('Failed to fetch device details')
            }   
            return response.data
        } catch (error) {
            console.error('Error fetching device details:', error)
            throw error
        }
    }

    const updateDevice = async (deviceId, data) => {
        try {
            console.log("data",data)
            console.log("deviceId",deviceId)


            const response = await axios.put(`${apiUrl}/update/${deviceId}`, data)
            if(response.status !== 200) {
                throw new Error('Failed to update device')
            }
            return response.data
        } catch (error) {
            console.error('Error updating device:', error)
            throw error
        }
    }   

    const deleteDevice = async (deviceId) => {
        try {
            const response = await axios.delete(`${apiUrl}/delete/${deviceId}`)
            if(response.status !== 200) {
                throw new Error('Failed to delete device')
            }
            return response.data
        } catch (error) {
            console.error('Error deleting device:', error)
            throw error
        }
    }

    const getAllDeviceTypes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/type`)
            if(response.status !== 200) {
                throw new Error('Failed to fetch device types')
            }
            return response.data
        } catch (error) {
            console.error('Error fetching device types:', error)
            throw error
        }
    }

    const addNewDeviceType = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/type/new`, data)
            if(response.status !== 201) {
                throw new Error('Failed to create device type')
            }
            return response.data
        } catch (error) {
            console.error('Error creating device type:', error)
            throw error
        }
    }
    
  return {
    addDevice,
    getAllDevices,
    getDeviceDetails,
    updateDevice,
    deleteDevice,
    getAllDeviceTypes,
    addNewDeviceType,
  };
}

export default useDevices