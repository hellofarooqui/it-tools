import React, { use, useState } from "react";
import { Button } from "../../components/ui/button";
import useSupportTicket from "../../hooks/useSupportTicket";
import { useNavigate } from "react-router-dom";

interface SupportTicket {
  ticket_number: string;
  title: string;
  description: string;
}

const defaultTicket: SupportTicket = {
  ticket_number: "",
  title: "",
  description: "",
};
const NewSupportTicket = () => {
    const navigate = useNavigate();
    const [ticket, setTicket] =  useState<SupportTicket>(defaultTicket);
    const [loading, setLoading] = React.useState(true);

    const {createSupportTicket} = useSupportTicket();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTicket({ ...ticket, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createSupportTicket(ticket);
            console.log("Ticket created successfully:", response);
            setTicket(defaultTicket); // Reset the form
            navigate("/support");
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="">
     <div>
        <h2 className="text-lg font-semibold">New Support Ticket</h2>

     </div>
     <div className="mt-4 bg-white p-4 rounded-md shadow">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="ticket_number">Ticket Number</label>
            <input
              type="text"
              id="ticket_number"
              value={ticket.ticket_number}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              name="ticket_number"
            />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={ticket.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              name="title"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={ticket.description}
              onChange={handleInputChange}
              name="description"
              placeholder="Enter description here..."
              className="resize-none w-full border border-gray-300 rounded-md p-2"
              rows={4}
            />
          </div>
          <Button type="submit" className="self-end">Submit</Button>
        </form>
     </div>
    </div>
  );
};

export default NewSupportTicket;
