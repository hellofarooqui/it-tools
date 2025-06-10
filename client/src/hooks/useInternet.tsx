import React from 'react'
import axios from 'axios'


const serverUrl = import.meta.env.VITE_SERVER_URL

const API_URL = `${serverUrl}/api/wan`

const useInternet = () => {

    const fetchInternetConnections = async () => {
        try {
            const response = await axios.get(API_URL)
            if (response.status !== 200) {
                throw new Error('Failed to fetch internet connections')
            }
            return response.data
        } catch (error) {
            console.error('Error fetching internet connections:', error)
            throw error
        }
    }
  return {fetchInternetConnections}
}

export default useInternet