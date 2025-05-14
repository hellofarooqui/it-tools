import React from 'react'
import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL
const apiUrl = `${serverUrl}/api/rma`

const useRMA = () => {

    const createRMA = async (data) => {
        try {
            const response = await axios.post(apiUrl, data)
            if(response.status !== 201) {
                throw new Error('Failed to create RMA')
            }
            return response.data
        } catch (error) {
            console.error('Error creating RMA:', error)
            throw error
        }
    } 

    const getAllRMAs = async () => {
        try {
            const response = await axios.get('/api/rma')
            if(response.status !== 200) {
                throw new Error('Failed to fetch RMAs')
            }
            return response.data
        } catch (error) {
            console.error('Error fetching RMAs:', error)
            throw error
        }
    }

    const getRMADetails = async (rmaId) => {
        try {
            const response = await axios.get(`/api/rma/${rmaId}`)
            if(response.status !== 200) {
                throw new Error('Failed to fetch RMA details')
            }   
            return response.data
        } catch (error) {
            console.error('Error fetching RMA details:', error)
            throw error
        }
    }
    const updateRMA = async (rmaId, data) => {
        try {
            const response = await axios.put(`/api/rma/${rmaId}`, data)
            if(response.status !== 200) {
                throw new Error('Failed to update RMA')
            }
            return response.data
        } catch (error) {
            console.error('Error updating RMA:', error)
            throw error
        }
    }   
    const deleteRMA = async (rmaId) => {
        try {
            const response = await axios.delete(`/api/rma/${rmaId}`)
            if(response.status !== 200) {
                throw new Error('Failed to delete RMA')
            }   
            return response.data
        } catch (error) {
            console.error('Error deleting RMA:', error)
            throw error
        }
    }   
    
    
  return {
    createRMA,
    getAllRMAs,
    getRMADetails,
    updateRMA,
    deleteRMA
  }
}

export default useRMA