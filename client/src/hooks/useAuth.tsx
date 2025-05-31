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

    const loginUser = async (userData) => {
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
    return {registerUser,loginUser, logoutUser}
}

export default useAuth;