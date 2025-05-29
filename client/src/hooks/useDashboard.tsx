const serverUrl = import.meta.env.VITE_SERVER_URL;

import axios from "axios";

const useDashboard = () => {
  const getActiveTickets = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/support?status=open&&status=in_progress`);
      if(response){
        console.log(response.data)
        return response.data
      }
    } catch (error) {
      throw new Error
    }
  };

  const getActiveRMA = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/rma/active`);
       if(response){
        console.log(response)
        return response.data
      }
    } catch (error) {
      throw new Error
    }
  };

  const getDeviceCount = async () => {
    try {
      const response = await axios.get();
    } catch (error) {
      throw new Error
    }
  };

  return { getActiveTickets, getActiveRMA, getDeviceCount };
};

export default useDashboard
