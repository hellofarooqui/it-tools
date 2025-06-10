import React from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'


const serverUrl = import.meta.env.VITE_SERVER_URL

const API_URL = `${serverUrl}/api/wan`

const useInternet = () => {

    const {token} = useAuthContext()

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

    const addNewInternet = async  (data) => {
        try{
            const response = await axios.post(`${API_URL}/new`, data , {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status !== 201){
                throw new Error("unable to add new internet")
            }
            return response.data
        }
        catch(error){
            throw error
        }
    }
  return {fetchInternetConnections , addNewInternet}
}

export default useInternet