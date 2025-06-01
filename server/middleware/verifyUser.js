import jwt from 'jsonwebtoken'

const verifyUser = (req,res,next) => {
    const token = req.headers["authorization"].split(" ")[1]
    console.log("Token", token)
    const user = jwt.verify(token,"aksdajksdASdajh")
    if(user){
        console.log("User",user)
    }
}

export default verifyUser