import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSupportTicket from "../../hooks/useSupportTicket";

const SupportTicketDetails = () => {
    const {ticketNumber} = useParams()

    const [ticket,setTicket] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("")

    const {getSupportTicketByNumber} = useSupportTicket()

    useEffect(()=>{
        const fetchTicketDetails = async () => {
            try{
                const response = await getSupportTicketByNumber(ticketNumber)
                if(response){
                    console.log(response)
                    setTicket(response)
                    setLoading(false)
                    setError("")
                }
            }
            catch(error){
                setError("Something went wrong")
            }
        }

        fetchTicketDetails()
    },[])

    if(loading){
        return(<div className="w-screen h-screen flex justify-center items-center">
            <p>Loading...</p>
        </div>)
    }

    if(error){
        return (
            <div>
                <p>{error}</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-y-8">
            <div className="bg-white p-4 rounded-md border border-gray-300">
                <h2 className="text-xl font-bold text-gray-600">{ticket.ticket_number} - {ticket.title}</h2>
            </div>
            <div className="bg-white p-4  border border-gray-300 rounded-sm">
                <h4 className=" font-semibold mb-2">Description</h4>
                <p className="text-sm text-gray-700">{ticket.description}</p>
            </div>

            <div >
                <h4 className=" font-semibold mb-2">Comments</h4>
                <div className="bg-white p-4  border border-gray-300 rounded-sm">
                    {!ticket.comments.length>0 ? <p>No comments</p> : ticket.comments.map(comment => <p>{comment}</p>)}
                </div>
                
            </div>
        </div>
    );
};

export default SupportTicketDetails;