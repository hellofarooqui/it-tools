import axios from 'axios'
const serverUrl = import.meta.env.VITE_SERVER_URL;

const useAuth = () => {

    const registerUser = async (userData) => {
        try{
            const response = await axios.post(`${serverUrl}/api/auth/register`, userData)
            if(response){
                return response
            }
        }
        catch(error){
            throw new Error()
        }
    }

    const signIn = async (userData) => {
        try{

            const response = await axios.post(`${serverUrl}/api/auth/login`, userData)
             if(response){
                console.log(response.data.token)
                localStorage.setItem("token", response.data.token)
                return response
            }
        }
        catch(error){
            console.log(error)
            throw new Error()
        }
    }
    const logoutUser = async () => {
        localStorage.removeItem("token")
    }

    const getUserDetailsWithToken = async (token) => {
        console.log("Getting user details with token" , token)
        try{
            const response = await axios.get(`${serverUrl}/api/auth/user`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return response.data
            
        }
        catch(error){
            console.log("Error",error)
        }
    }

    return {registerUser,signIn, logoutUser, getUserDetailsWithToken}
}

export default useAuth;